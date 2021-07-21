import React from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useState } from 'react';
import Moment from 'react-moment';
import style from './Table.module.css';

const GitTable = () => {

    const [commitList, setCommitList] = useState([]);
    const [orderByCol, setOrderByCol] = useState('commitDate');

    useEffect(() => {

        axios.get('https://api.github.com/repositories/19438/commits')
            .then((response) => {
                const list = response.data;
                list.forEach(item => {
                    item.authorName = item.commit.author.name;
                    item.commitDate = item.commit.author.date;
                });
                setCommitList(list);
            });

    }, []);

    const reorderCommitList = (selectedCol) => {

        const reorderedCommitList = [...commitList];

        if (selectedCol === orderByCol) {
            reorderedCommitList.reverse();
            setCommitList(reorderedCommitList);
        } else {
            reorderedCommitList.sort((a, b) => {
                if (a[selectedCol] < b[selectedCol]) {
                    return -1;
                } else
                    if (a[selectedCol] > b[selectedCol]) {
                        return 1;
                    } else {
                        return 0;
                    }
            });
            setOrderByCol(selectedCol);
            setCommitList(reorderedCommitList);
        }
    }

    return (
        <div>
            <h4>Displaying {commitList.length} commits</h4>
            <div className={style.tableContainer}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className={style.sortableHeader} onClick={() => reorderCommitList('authorName')}>Author name</th>
                            <th className={style.sortableHeader} onClick={() => reorderCommitList('commitDate')}>Author commit date</th>
                            <th>Message</th>
                            <th>Commit URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commitList.map((commit, index) => (
                            <tr key={index}>
                                <td>{commit.commit.author.name}</td>
                                <td><Moment format="HH:mm DD/MM/YYYY" date={commit.commit.author.date} /></td>
                                <td>{commit.commit.message}</td>
                                <td>{commit.commit.url}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default GitTable;