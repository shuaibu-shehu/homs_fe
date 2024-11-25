'use client';

import { useState } from 'react';
// import { useOxygenStore } from '../../../store/useOxygenStore';
// import { validateOxygenInput } from '../../../utils/validation';

export default function OxygenForm() {
    const [value, setValue] = useState('');
    const [isFirstTime, setIsFirstTime] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numericValue = parseFloat(value);
        const validationError = validateOxygenInput(numericValue);
        if (validationError) {
            setError(validationError);
            return;
        }
        addEntry({
            value: numericValue,
            isFirstTime,
            remarks,
            nurseName: 'Current Nurse', // This should be dynamically set based on logged-in user
        });
        resetForm();
    };

    const resetForm = () => {
        setValue('');
        setIsFirstTime(false);
        setRemarks('');
        setError(null);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oxygenValue">
                    Oxygen Consumption (L/min)
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="oxygenValue"
                    type="number"
                    step="0.1"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        checked={isFirstTime}
                        onChange={(e) => setIsFirstTime(e.target.checked)}
                        className="form-checkbox h-5 w-5 text-green-600"
                    />
                    <span className="ml-2 text-gray-700">First-Time Oxygen Use</span>
                </label>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="remarks">
                    Remarks
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="remarks"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={3}
                ></textarea>
            </div>
            {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
            <div className="flex items-center justify-between">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
                <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={resetForm}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

