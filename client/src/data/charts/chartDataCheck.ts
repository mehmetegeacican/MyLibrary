import { IAvgAuthor, IBookByAuthorStat, IBookByCategoryStat, IBookByStatusStat } from "../../interfaces/DataInterfaces";

export function isBookByAuthorStat(value: any): value is IBookByAuthorStat {
    return (
        typeof value === "object" &&
        "author_name" in value &&
        "author_count" in value
    );
}
export function isBookByCategoryrStat(value: any): value is IBookByCategoryStat {
    return (
        typeof value === "object" &&
        "category_name" in value &&
        "category_count" in value
    );
}
export function isBookByStatuesStat(value: any): value is IBookByStatusStat {
    return (
        typeof value === "object" &&
        "status" in value &&
        "total" in value
    );
}

export function isAvgLikedByAuthorStat(value: any): value is IAvgAuthor {
    return (
        typeof value === "object" &&
        "author_name" in value &&
        "avg_liked" in value
    );
}