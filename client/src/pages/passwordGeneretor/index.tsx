import React, { useState } from 'react';
import { Button, IconButton, ButtonBase } from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import Slider from '@mui/material/Slider';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import CachedIcon from '@mui/icons-material/Cached';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const btn = {
    backgroundColor: 'white',
    border: '1px solid #355BC0',
    borderRadius: '1.5rem',
    padding: '0.375rem 0.75rem',
};
const generateBtn = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.375rem 1.5rem',
    borderRadius: '24px',
    backgroundColor: 'rgb(21 128 61 / var(--tw-bg-opacity))',
    width: '100%',
};
const digits = '0123456789';
const upperAlpa = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerApla = 'abcdefghijklmnopqrstuvwxyz';
const symbol = '!@#$%^&*()';

const PasswordGenerator = () => {
    const [characterLength, setCharacterLength] = useState<number>(8);
    const [generatedPass, setGeneratedPass] = useState('');
    const [includesCases, setIncludesCases] = useState({
        upperCase: true,
        lowerCase: true,
        numbers: true,
        symbols: true,
    });

    const handleCharLength = (e: any) => {
        setCharacterLength(e.target.value);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setIncludesCases((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    const generateRandomPass = () => {
        let chars = '';
        if (includesCases.upperCase) chars += upperAlpa;
        if (includesCases.lowerCase) chars += lowerApla;
        if (includesCases.numbers) chars += digits;
        if (includesCases.symbols) chars += symbol;

        let password = '';
        for (let i = 0; i <= characterLength - 1; i++) {
            const randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber + 1);
        }
        setGeneratedPass(password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGeneratedPass(e.target.value);
    };

    const { upperCase, lowerCase, numbers, symbols } = includesCases;
    const error = [upperCase, lowerCase, numbers, symbols].filter((x) => x).length < 1;

    return (
        <>
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-between items-center bg-primary-lighter p-8 w-1/3 rounded-3xl gap-y-6">
                    <p className="text-4xl">Password Generator</p>
                    <div className="w-9/12 flex flex-col gap-y-4">
                        <div className="flex justify-between items-center px-1 rounded-3xl border border-br bg-white w-full">
                            <input
                                className="px-3 py-2 outline-none bg-none rounded-3xl w-full"
                                type="text"
                                placeholder="P4$5W0rD!"
                                value={generatedPass}
                                onChange={handlePasswordChange}
                            />
                            <IconButton sx={{ m: 0, p: 0 }}>
                                <div className="flex justify-center items-center rounded-full text-gray-800 p-1.5 bg-primary-lighter">
                                    <CopyAllIcon fontSize="small" />
                                </div>
                            </IconButton>
                        </div>

                        <div className="flex flex-col items-center rounded-3xl border border-br bg-white w-full p-2">
                            <div className="flex justify-between w-full px-2">
                                <p>Character Length</p>
                                <p
                                    className={`font-semibold mr-2 ${
                                        characterLength > 7 ? 'text-green-700' : 'text-red-700'
                                    }`}
                                >
                                    {characterLength}
                                </p>
                            </div>
                            <div className="w-full px-3 mt-2">
                                <Slider
                                    defaultValue={8}
                                    size="small"
                                    min={1}
                                    value={characterLength}
                                    max={25}
                                    aria-label="Default"
                                    valueLabelDisplay="off"
                                    onChange={handleCharLength}
                                />
                            </div>
                            <div className="w-full px-2">
                                <FormControl error={error} component="fieldset" variant="standard">
                                    <FormGroup>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={includesCases.upperCase}
                                                    onChange={handleCheckboxChange}
                                                    name="upperCase"
                                                />
                                            }
                                            label="Include Uppercase Letters"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={includesCases.lowerCase}
                                                    onChange={handleCheckboxChange}
                                                    name="lowerCase"
                                                />
                                            }
                                            label="Include Lowercase Letters"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={includesCases.numbers}
                                                    onChange={handleCheckboxChange}
                                                    name="numbers"
                                                />
                                            }
                                            label="Include Numbers"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    checked={includesCases.symbols}
                                                    onChange={handleCheckboxChange}
                                                    name="symbols"
                                                />
                                            }
                                            label="Include Symbols"
                                        />
                                    </FormGroup>
                                    <FormHelperText>{error ? '* at least one field is required' : null}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className="px-2 w-full">
                                <div className="flex justify-between px-6 py-2 rounded-3xl bg-primary-lighter">
                                    <div>Strength :</div>
                                    <div className="text-green-700 font-semibold">Strong 😎</div>
                                </div>
                            </div>
                            <div className="mt-2 px-2 w-full">
                                <ButtonBase
                                    disabled={error}
                                    sx={{ ...generateBtn, opacity: error ? '0.7' : '1' }}
                                    onClick={generateRandomPass}
                                >
                                    <div className="font-semibold uppercase text-center flex items-center">
                                        Generate &nbsp;{' '}
                                        {generatedPass.length ? (
                                            <CachedIcon fontSize="small" />
                                        ) : (
                                            <ArrowForwardIcon fontSize="small" />
                                        )}
                                    </div>
                                </ButtonBase>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <ButtonBase sx={btn}>Save Password</ButtonBase>
                            <ButtonBase sx={btn}>See All Password</ButtonBase>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PasswordGenerator;
