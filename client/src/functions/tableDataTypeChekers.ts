/**
 * 
 * @param value The Value to Check
 * @returns 
 */

import { TableCell, Button, IconButton } from "@mui/material";
import { IBook } from "../interfaces/DataInterfaces";

// Type guard function to check if an object is of type IBook
export function isIBook(value: any): value is IBook {
    return (
        typeof value === "object" &&
        "id" in value &&
        "name" in value &&
        "author" in value &&
        "category" in value &&
        "status" in value
    );
}

