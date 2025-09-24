import { useEffect, useState } from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import PollCard from "../primary/PollCard";
import { useNavigate } from "react-router-dom";

function DashboardHome() {
    const [polls, setPolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchedPolls = [
            {
                "_id": "652d9f8b4e3a9c0012345678",
                "name": "Favorite Programming Language",
                "question": "Which programming language do you prefer?",
                "status": "Closed",
                "totalVotes": 42,
                "createdBy": { _id: "2083unfasdhf238nr0i2j3", name: "Aditya Raj" }
            },
            {
                "_id": "652d9f8b4e3a9c0012345679",
                "name": "Best Frontend Framework",
                "question": "Which frontend framework do you like the most?",
                "status": "Open",
                "totalVotes": 30,
                "createdBy": { _id: "2083unfasdhf238nr0i2j3", name: "Aditya Raj" }
            },
            {
                "_id": "652d9f8b4e3a9c0012345680",
                "name": "Preferred IDE",
                "question": "Which IDE do you use most often?",
                "status": "Not Started",
                "totalVotes": 25,
                "createdBy": { _id: "2083unfasdhf238nr0i2j3", name: "Aditya Raj" }
            },
            {
                "_id": "652d9f8b4e3a9c0012345681",
                "name": "Best Mobile OS",
                "question": "Which mobile operating system do you prefer?",
                "status": "Open",
                "totalVotes": 18,
                "createdBy": { _id: "2083unfasdhf238nr0i2j3", name: "Aditya Raj" }
            },
            {
                "_id": "652d9f8b4e3a9c0012345682",
                "name": "Favorite Database",
                "question": "Which database technology do you prefer?",
                "status": "Closed",
                "totalVotes": 40,
                "createdBy": { _id: "2083unfasdhf238nr0i2j3", name: "Aditya Raj" }
            }
        ];

        setPolls(fetchedPolls);
        setFilteredPolls(fetchedPolls);
    }, []);

    // Handle search input change
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        const filtered = polls.filter(
            (poll) =>
                poll.name.toLowerCase().includes(value.toLowerCase()) ||
                poll.question.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredPolls(filtered);
    };

    return (
        <>
            <div className="flex space-around items-center w-full mb-4">
                <Input
                    className="flex-1"
                    placeholder="Search polls..."
                    value={searchValue}
                    onChange={handleSearch}
                />
                <Button className="ml-2">Search</Button>
            </div>

            <div className="Container flex flex-wrap justify-center items-center gap-3 mt-20">
                {filteredPolls.length > 0 ? (
                    filteredPolls.map((item) => (
                        <PollCard key={item._id} item={item} />
                    ))
                ) : (
                    <p>No polls found.</p>
                )}

                <div
                    onClick={() => { navigate('/dashboard/polls/create') }}
                    className="AddNewPoll cursor-pointer flex bg-neutral-100 rounded-xl p-5 px-20 items-center flex-col gap-4 justify-center"
                >
                    <img src="/imgs/plus-icon.svg" className='w-18' alt="plus-icon" />
                    <p className="font-xl text-neutral-800">Create Poll</p>
                </div>
            </div>


        </>
    );
}

export default DashboardHome;
