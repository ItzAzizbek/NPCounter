import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function NPCounter() {
  const [people, setPeople] = useState([]);
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');

  const addPerson = () => {
    if (fullName.trim() && birthDate) {
      const newPerson = {
        id: Date.now(),
        fullName: fullName.trim(),
        birthDate: birthDate,
      };
      setPeople([...people, newPerson]);
      setFullName('');
      setBirthDate('');
    }
  };

  const deletePerson = (id) => {
    setPeople(people.filter(person => person.id !== id));
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateStr) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addPerson();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">NPCounter</h1>
          <p className="text-gray-600">Keep track of people and their birth dates</p>
        </div>

        {/* Add Person Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Person</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              />
            </div>
            <button
              onClick={addPerson}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <Plus size={20} />
              Add Person
            </button>
          </div>
        </div>

        {/* People List */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            People ({people.length})
          </h2>
          {people.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No people added yet. Add one to get started!</p>
          ) : (
            <div className="space-y-3">
              {people.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{person.fullName}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Birth Date: {formatDate(person.birthDate)}</p>
                      <p className="font-medium text-indigo-600">Age: {calculateAge(person.birthDate)} years old</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deletePerson(person.id)}
                    className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete person"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}