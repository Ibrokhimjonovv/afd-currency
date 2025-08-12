'use client';

import React, { useEffect, useState } from 'react';
import './calculate.scss';

const Calculate = () => {
    const [rates, setRates] = useState({});
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UZS');
    const [amount, setAmount] = useState(1);
    const [amountRaw, setAmountRaw] = useState('1');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [date, setDate] = useState('');

    const formatNumber = (value) => {
        if (value === '' || value === null || isNaN(value)) return '';
        return new Intl.NumberFormat('uz-UZ').format(value);
    };

    const fetchCurrencyRates = () => {
        fetch(`https://v6.exchangerate-api.com/v6/72f99500f6844804f605d47c/latest/USD`)
            .then((res) => res.json())
            .then((data) => {
                if (data.result === "success") {
                    setRates(data.conversion_rates || {});
                    setDate(data.time_last_update_utc);
                } else {
                    console.error('API error:', data);
                }
            })
            .catch((err) => {
                console.error('Error on loading:', err);
            });
    };

    useEffect(() => {
        fetchCurrencyRates();
    }, []);

    useEffect(() => {
        if (!amount || fromCurrency === '' || toCurrency === '') {
            setConvertedAmount('');
            return;
        }

        if (fromCurrency === toCurrency) {
            setConvertedAmount(formatNumber(amount));
            return;
        }

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (!fromRate || !toRate) return;

        const rate = toRate / fromRate;
        const result = amount * rate;
        setConvertedAmount(formatNumber(result.toFixed(2)));
    }, [amount, fromCurrency, toCurrency, rates]);

    return (
        <div id="calculate">
            <h1 className='calculate-title'>Currency Converter</h1>
            <p className='calculate-description'>
                Check live rates, set rate alerts, receive notifications and more
            </p>

            <div className="one-currency">
                {fromCurrency === toCurrency ? (
                    `1 ${fromCurrency} = 1 ${toCurrency}`
                ) : rates[fromCurrency] && rates[toCurrency] ? (
                    `1 ${fromCurrency} = ${new Intl.NumberFormat('uz-UZ', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(rates[toCurrency] / rates[fromCurrency])} ${toCurrency}`
                ) : (
                    'Loading...'
                )}
            </div>

            <div className="updated-date">
                {date ? `${date} · Updated` : 'Date is loading...'}
            </div>

            <div className="calculate-inputs">
                <label>Amount</label>
                <div className="from">
                    <select
                        className="currency-type"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="currency-input"
                        value={amountRaw}
                        onChange={(e) => {
                            const val = e.target.value;
                            setAmountRaw(val);
                            const normalizeUzInput = (value) => {
                                return value.replace(/\s/g, '').replace(',', '.');
                            };
                            const parsed = parseFloat(normalizeUzInput(val));
                            if (!isNaN(parsed)) {
                                setAmount(parsed);
                            } else {
                                setConvertedAmount('');
                            }
                        }}
                        onBlur={() => {
                            if (amountRaw !== '') {
                                setAmountRaw(formatNumber(amount));
                            }
                        }}
                        onFocus={() => {
                            setAmountRaw(amount.toString().replace('.', ','));
                        }}
                    />
                </div>

                <div className="line">
                    <div className="circle">
                        <img src="/change.png" alt="" />
                    </div>
                </div>

                <label>Converted Amount</label>
                <div className="to">
                    <select
                        className="currency-type"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        {Object.keys(rates).map((cur) => (
                            <option key={cur} value={cur}>{cur}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="currency-input"
                        readOnly
                        value={convertedAmount}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calculate;
