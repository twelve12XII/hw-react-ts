import React, { useState } from "react";
import style from "./SearchBar.module.css";
import Input from "../../common/Input/Input";

interface SearchBarProps{
    onSearch?: (value:string)=>void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
    const [searchValue, setSearchValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div className={style.search}>
            <Input 
                placeholder="Search..." 
                value={searchValue} 
                onChange={handleChange}
            />
        </div>
    );
}
