import React, { useState, useEffect } from 'react';

const TeacherSubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const [newSubmission, setNewSubmission] = useState({ type: '', content: '', date: '', file: null });

    useEffect(() => {
        // Fetch submissions from the server
        fetch('/api/submissions')
            .then(response => response.json())
            .then(data => setSubmissions(data));
    }, []);

    const handleFileChange = (e) => {
        setNewSubmission({ ...newSubmission, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('type', newSubmission.type);
        formData.append('content', newSubmission.content);
        formData.append('date', newSubmission.date);
        formData.append('file', newSubmission.file);

        // Post the new submission to the server
        fetch('/api/submissions', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => setSubmissions([...submissions, data]));
    };

    return (
        <div>
            <h1>Submit Documents</h1>
            <form onSubmit={handleSubmit}>
                <select value={newSubmission.type} onChange={(e) => setNewSubmission({...newSubmission, type: e.target.value})}>
                    <option value="">Select Type</option>
                    <option value="Lesson Plan">Lesson Plan</option>
                    <option value="Annual Plan">Annual Plan</option>
                    <option value="Notes">Notes</option>
                </select>
                <input type="text" value={newSubmission.content} onChange={(e) => setNewSubmission({...newSubmission, content: e.target.value})} placeholder="Content" />
                <input type="date" value={newSubmission.date} onChange={(e) => setNewSubmission({...newSubmission, date: e.target.value})} />
                <input type="file" onChange={handleFileChange} accept=".docx,.pdf" />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {submissions.map(submission => (
                    <li key={submission.id}>
                        {submission.date}: {submission.type} - {submission.content} 
                        <a href={submission.fileUrl}>Download</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeacherSubmissions;
