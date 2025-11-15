import { Advocate } from "./types";

interface AdvocateTableProps {
    advocates: Advocate[];
}

const AdvocateTable = ({ advocates }: AdvocateTableProps) => {
    const greenCell = "px-6 py-4 bg-green-900 dark:text-white border-b border-white";
    const whiteCell = "px-6 py-4";
    const headerCell = "px-6 py-4 sticky top-0"
    
    if (advocates.length === 0) {
        return (
            <div role="status" className="text-center py-8 text-green-900">
                <p>No matches found. Try adjusting your search criteria.</p>
            </div>
        );
    }
    
    return (
        <table className="table-auto w-full align-top text-left rtl:text-right" role="table" aria-label="Advocates">
            <thead className="bg-green-900 px-6 py-4 text-white dark:bg-green-900 sticky top-0">
                <tr>
                    <th scope="col" className={headerCell}>First Name</th>
                    <th scope="col" className={headerCell}>Last Name</th>
                    <th scope="col" className={headerCell}>City</th>
                    <th scope="col" className={headerCell}>Degree</th>
                    <th scope="col" className={headerCell}>Specialties</th>
                    <th scope="col" className={headerCell}>Years of Experience</th>
                    <th scope="col" className={headerCell}>Phone Number</th>
                </tr>
            </thead>
            <tbody>
                {advocates.map((advocate: Advocate) => {
                    if (advocate) {
                        const phoneNumReadable = advocate.phoneNumber ? advocate.phoneNumber.toString().replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
                        return (
                            <tr key={advocate.id} className="px-6 py-4 font-medium text-green-900 whitespace-nowrap align-top border-b border-green-900">
                                <td className={whiteCell}>{advocate.firstName}</td>
                                <td className={greenCell}>{advocate.lastName}</td>
                                <td className={whiteCell}>{advocate.city}</td>
                                <td className={greenCell}>{advocate.degree}</td>
                                <td className={`${whiteCell} text-xs`}>
                                    <ul className="list-none" aria-label={`${advocate.firstName} ${advocate.lastName} specialties`}>
                                        {advocate.specialties.map((s: string) => (
                                            <li key={`${advocate.id}-${s}`}>• {s}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className={greenCell}>
                                    <span aria-label={`${advocate.yearsOfExperience} years of experience`}>
                                        {advocate.yearsOfExperience}
                                    </span>
                                </td>
                                <td className={whiteCell}>
                                    <a href={`tel:${advocate.phoneNumber}`} className="hover:underline" aria-label={phoneNumReadable}>
                                        {phoneNumReadable}
                                    </a>
                                </td>
                            </tr>
                        );
                    }
                    return null;
                })}
            </tbody>
        </table>
    )
}

export default AdvocateTable;