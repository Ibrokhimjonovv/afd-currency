'use client';

import React, { useEffect, useState } from 'react';
import './calculate.scss';

const Calculate = () => {
    const [quotes, setQuotes] = useState({});
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
        if (fromCurrency === 'USD' && toCurrency === 'USD') {
            setQuotes({ USDUSD: 1 });
            return;
        }

        const currenciesSet = new Set();
        if (fromCurrency !== 'USD') currenciesSet.add(fromCurrency);
        if (toCurrency !== 'USD') currenciesSet.add(toCurrency);

        const currenciesParam = [...currenciesSet].join(',');

        fetch(
            `https://api.currencylayer.com/live?access_key=fd977cbbecfaaf0eb8aebd503b405328&currencies=${currenciesParam}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setQuotes(data.quotes || {});
                    const updatedAt = new Date(data.timestamp * 1000);
                    setDate(updatedAt.toLocaleString('en-EN'));
                } else {
                    console.error('API error:', data.error?.info);
                }
            })
            .catch((err) => {
                console.error('Error on loading:', err);
            });
    };

    useEffect(() => {
        fetchCurrencyRates();
    }, [fromCurrency, toCurrency]);

    useEffect(() => {
        if (!amount || fromCurrency === '' || toCurrency === '') {
            setConvertedAmount('');
            return;
        }

        if (fromCurrency === toCurrency) {
            setConvertedAmount(formatNumber(amount));
            return;
        }

        const usdFrom = fromCurrency === 'USD' ? 1 : quotes[`USD${fromCurrency}`];
        const usdTo = toCurrency === 'USD' ? 1 : quotes[`USD${toCurrency}`];

        if (!usdFrom || !usdTo) return;

        const rate = usdTo / usdFrom;
        const result = amount * rate;
        setConvertedAmount(formatNumber(result.toFixed(2)));
    }, [amount, fromCurrency, toCurrency, quotes]);

    return (
        <div id="calculate">
            <h1 className='calculate-title'>Currency Converter</h1>
            <p className='calculate-description'>Check live rates, set rate alerts, recive notifications and more</p>

            <div className="one-currency">
                {fromCurrency === toCurrency ? (
                    `1 ${fromCurrency} = 1 ${toCurrency}`
                ) : quotes[`USD${fromCurrency}`] || quotes[`USD${toCurrency}`] ? (
                    `1 ${fromCurrency} = ${new Intl.NumberFormat('uz-UZ', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format(
                        (toCurrency === 'USD' ? 1 : quotes[`USD${toCurrency}`]) /
                        (fromCurrency === 'USD' ? 1 : quotes[`USD${fromCurrency}`])
                    )
                    } ${toCurrency}`
                ) : (
                    'Loading...'
                )}
            </div>


            <div className="updated-date">
                {date ? `${date} · Updated` : 'Date is loading...'}
            </div>

            <div className="calculate-inputs">
                <label htmlFor="">
                    Amount
                </label>
                <div className="from">
                    <select
                        className="currency-type"
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="CHF">CHF</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                        <option value="NZD">NZD</option>
                        <option value="CNY">CNY</option>
                        <option value="RUB">RUB</option>
                        <option value="INR">INR</option>
                        <option value="KRW">KRW</option>
                        <option value="BRL">BRL</option>
                        <option value="MXN">MXN</option>
                        <option value="ZAR">ZAR</option>
                        <option value="TRY">TRY</option>
                        <option value="SGD">SGD</option>
                        <option value="SEK">SEK</option>
                        <option value="NOK">NOK</option>
                        <option value="UZS">UZS</option>

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

                <label htmlFor="">
                    Converted Amount
                </label>
                <div className="to">
                    <select
                        className="currency-type"
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                    >
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="JPY">JPY</option>
                        <option value="CHF">CHF</option>
                        <option value="CAD">CAD</option>
                        <option value="AUD">AUD</option>
                        <option value="NZD">NZD</option>
                        <option value="CNY">CNY</option>
                        <option value="RUB">RUB</option>
                        <option value="INR">INR</option>
                        <option value="KRW">KRW</option>
                        <option value="BRL">BRL</option>
                        <option value="MXN">MXN</option>
                        <option value="ZAR">ZAR</option>
                        <option value="TRY">TRY</option>
                        <option value="SGD">SGD</option>
                        <option value="SEK">SEK</option>
                        <option value="NOK">NOK</option>
                        <option value="UZS">UZS</option>

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
