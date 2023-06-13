import React from "react"

export const NewPrice = (item, price = '') => {
    if (item) {
        const Nprice = item?.price.split("$")[1]
        return Nprice
    }
    const Nprice = price.split("$")[1]
    return Nprice
}