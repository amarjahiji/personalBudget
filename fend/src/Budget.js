import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Budget = () => {
    const [budget, setBudget] = useState({ total: 0, needs: 0, wants: 0, savings: 0 });
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('needs');
    const [action, setAction] = useState('deposit');

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get('username');

    useEffect(() => {
        if (!username) {
            console.error("No username provided to Budget component.");
            return;
        }

        const fetchBudget = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/budget', {
                    params: { username }
                });
                setBudget(response.data);
            } catch (error) {
                console.error("Error fetching budget", error);
            }
        };

        fetchBudget();
    }, [username]);

    const handleTransaction = async () => {
        if (!username) {
            console.error("No username provided for transaction");
            return;
        }

        try {
            if (action === 'deposit') {
                await axios.post('http://127.0.0.1:5000/budget/deposit', {
                    username,
                    amount: parseFloat(amount)
                });
            } else {
                await axios.post('http://127.0.0.1:5000/budget/withdraw', {
                    username,
                    category,
                    amount: parseFloat(amount)
                });
            }

            const response = await axios.get('http://127.0.0.1:5000/budget', {
                params: { username }
            });
            setBudget(response.data);
            setAmount('');
        } catch (error) {
            console.error("Error handling transaction", error);
        }
    };

    return (
        <div className="budget-wrapper">
            <div className="budget-summary">
                <h3 className="budget-title">Your Budget</h3>
                <p className="budget-amount">Total: ${budget.total}</p>
                <p className="budget-amount">Needs: ${budget.needs}</p>
                <p className="budget-amount">Wants: ${budget.wants}</p>
                <p className="budget-amount">Savings: ${budget.savings}</p>
            </div>

            <div className="transaction-form">
  <div className="transaction-field">
    <select
      className="transaction-select"
      value={action}
      onChange={(e) => setAction(e.target.value)}
    >
      <option value="deposit">Deposit</option>
      <option value="withdraw">Withdraw</option>
    </select>
  </div>
  <div className="transaction-field">
    <input
      className="transaction-input"
      type="number"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Enter amount"
    />
  </div>
  {action === 'withdraw' && (
    <div className="transaction-field">
      <select
        className="transaction-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="needs">Needs</option>
        <option value="wants">Wants</option>
        <option value="savings">Savings</option>
      </select>
    </div>
  )}
  <div className="transaction-field">
    <button className="transaction-button" onClick={handleTransaction}>
      {action === 'deposit' ? 'Deposit' : 'Withdraw'}
    </button>
  </div>
</div>

        </div>
    );
};

export default Budget;
