import { useEffect, useState } from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import PollCard from "../primary/PollCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
function DashboardHome() {
    const [polls, setPolls] = useState([]);
    const [filteredPolls, setFilteredPolls] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
    const { user, setLoading } = useAuth();

    const fetchPolls = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/poll`, {
                withCredentials: true,
            });
            setPolls(res.data);
        } catch (err) {
            console.error("Error fetching polls:", err);
            setError("Failed to load polls");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPolls();
        setPolls(fetchPolls);
        setFilteredPolls(fetchPolls);
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
