import React from "react";

const Form = () => {
    return (
        <div className="container mx-auto p-6">
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full border px-3 py-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Candidate Name"
                    className="w-full border px-3 py-2 rounded"
                />
                <select className="w-full border px-3 py-2 rounded">
                    <option>Applied</option>
                    <option>Shortlisted</option>
                    <option>Interviewed</option>
                    <option>Hired</option>
                    <option>Rejected</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded"
                >
                    Add Application
                </button>
            </form>
        </div>
    );
};

export default Form;
