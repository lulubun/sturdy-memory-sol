import { Advocate } from "./types";

interface AdvocateTableProps {
    advocates: Advocate[];
}

const AdvocateTable = ({ advocates }: AdvocateTableProps) => {
    const greenCell = "px-6 py-4 bg-green-900 dark:text-white border-b border-white";
    const whiteCell = "px-6 py-4";
    const headerCell = "px-6 py-4 sticky top-0"
    return (
        <table className="table-auto w-full align-top text-left rtl:text-right">
            <thead className="bg-green-900 px-6 py-4 text-white dark:bg-green-900  sticky top-0">
                <tr className="px-6 py-4 font-medium text-green-900 whitespace-nowrap bg-green-900 dark:text-white dark:bg-green-900 sticky top-0">
                    <td className={headerCell}>First Name</td>
                    <td className={headerCell}>Last Name</td>
                    <td className={headerCell}>City</td>
                    <td className={headerCell}>Degree</td>
                    <td className={headerCell}>Specialties</td>
                    <td className={headerCell}>Years of Experience</td>
                    <td className={headerCell}>Phone Number</td>
                </tr>
            </thead>
            <tbody>
                {advocates.map((advocate: Advocate, idx: number) => {
                    if (advocate) {
                        const phoneNumReadable = advocate.phoneNumber ? advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
                        return (
                            <tr key={advocate.lastName + idx} className="px-6 py-4 font-medium text-green-900 whitespace-nowrap align-top border-b border-green-900">
                                <td className={whiteCell}>{advocate.firstName}</td>
                                <td className={greenCell}>{advocate.lastName}</td>
                                <td className={whiteCell}>{advocate.city}</td>
                                <td className={greenCell}>{advocate.degree}</td>
                                <td className={`${whiteCell} text-xs`}>
                                    {advocate.specialties.map((s: string, i: number) => (
                                        <div key={s + i}>*{s}</div>
                                    ))}
                                </td>
                                <td className={greenCell}>{advocate.yearsOfExperience}</td>
                                <td className={whiteCell}>{phoneNumReadable}</td>
                            </tr>
                        );
                    } else {
                        return <></>
                    }
                })}
            </tbody>
        </table>
    )
}

export default AdvocateTable;