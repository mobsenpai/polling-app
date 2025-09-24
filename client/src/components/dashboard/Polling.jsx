import React, { useState, useEffect } from 'react';

export default function Polling({ poll }) {
    // Example poll if not provided
    poll = poll || {
        id: "poll1", // unique poll ID for tracking
        question: "Which programming language do you prefer?",
        options: [
            { text: "JavaScript", votes: 10 },
            { text: "Python", votes: 5 },
            { text: "C++", votes: 3 },
        ],
        multicasting: true,
        isResultPublic: true,
    };

    const [options, setOptions] = useState(poll.options);
    const [userVotes, setUserVotes] = useState([]);

    const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

    // Load user votes from localStorage
    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem(`poll-${poll.id}-votes`)) || [];
        setUserVotes(votes);
    }, [poll.id]);

    const handleVote = (index) => {
        // Single-select poll: overwrite any previous vote
        if (!poll.multicasting) {
            if (userVotes.includes(index)) return; // already voted for this
            const newOptions = [...options];
            if (userVotes.length > 0) {
                // Decrease previous vote count
                newOptions[userVotes[0]].votes -= 1;
            }
            newOptions[index].votes += 1;
            setOptions(newOptions);
            setUserVotes([index]);
            localStorage.setItem(`poll-${poll.id}-votes`, JSON.stringify([index]));
        } else {
            // Multi-select poll
            const newOptions = [...options];
            let newUserVotes = [...userVotes];
            if (userVotes.includes(index)) {
                // unvote
                newOptions[index].votes -= 1;
                newUserVotes = userVotes.filter(i => i !== index);
            } else {
                // vote
                newOptions[index].votes += 1;
                newUserVotes.push(index);
            }
            setOptions(newOptions);
            setUserVotes(newUserVotes);
            localStorage.setItem(`poll-${poll.id}-votes`, JSON.stringify(newUserVotes));
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div>
                
            </div>
            <div className="flex rounded-lg mt-30 items-center justify-around overflow-hidden w-250 shadow-lg">
                {/* Left side: Percentage bars */}
                {poll.isResultPublic && (
                    <div className="w-1/2 p-4 bg-gray-100 flex flex-col gap-3">
                        {options.map((opt, idx) => {
                            const percentage = totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0;
                            return (
                                <div key={idx}>
                                    <div className="flex justify-between mb-1">
                                        <span>{opt.text}</span>
                                        <span>{percentage}%</span>
                                    </div>
                                    <div className="bg-gray-300 h-4 rounded">
                                        <div
                                            className="bg-violet-500 h-4 rounded"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Right side: Question and options */}
                <div className={`${poll.isResultPublic ? "w-1/2" : "w-full"} p-4 flex flex-col gap-4`}>
                    <h2 className="text-lg font-semibold">{poll.question}</h2>
                    <div className="flex flex-col gap-2">
                        {options.map((opt, idx) => (
                            <label
                                key={idx}
                                className={`flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-violet-300 ${userVotes.includes(idx) ? "bg-violet-200" : ""
                                    }`}
                            >
                                <input
                                    type={poll.multicasting ? "checkbox" : "radio"}
                                    name={`poll-${poll.id}`}
                                    checked={userVotes.includes(idx)}
                                    onChange={() => handleVote(idx)}
                                    className="accent-blue-500"
                                />
                                {opt.text} ({opt.votes})
                            </label>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500">Total Votes: {totalVotes}</p>
                </div>
            </div>
        </div>
    );
}
