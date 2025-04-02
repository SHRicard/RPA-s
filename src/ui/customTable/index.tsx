import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CRow, CAvatar, CTooltip } from '@coreui/react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { theme } from '../../theme';
import { useMediaQuery } from 'react-responsive';
import { getStatusColor } from '../../utils';


interface User {
    _id: string;
    phone: string;
    email: string;
    password: string;
    role: string;
    name: string;
    avatar: string;
    documents: string;
    dateBirth: string;
    genero: string;
    country: string;
    city: string;
    status: string;
}

interface TableProps {
    headerLarge: string[]
    headerSmall: string[]
    data: User[];
    onDelete: (userId: string) => void;
    handleEditById?: (userId: string) => void;
    handleEditModal?: (pros: boolean) => void;
    toolTip: string[]
    type?: "usuario" | "seguridad"
}




export const CustomTable = ({
    headerLarge,
    headerSmall,
    data,
    onDelete,
    toolTip,
    type = "usuario",
    handleEditModal,
    handleEditById }: TableProps) => {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

    const captuData = (open: boolean, userId: string) => {
        if (handleEditById) {
            handleEditById(userId);
        }
        if (handleEditModal) {
            handleEditModal(open);
        }
    };

    return (
        <CRow>
            {!isSmallScreen ?
                <CTable>
                    <CTableHead>
                        <CTableRow className='text-start'>
                            {headerLarge.map((header, index) => (
                                <CTableHeaderCell key={index} scope="col" className='pb-4'>
                                    {header}
                                </CTableHeaderCell>
                            ))}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody style={{ marginTop: '20px' }}>
                        {data.map((user, index) => (
                            <CTableRow key={index} className='text-start'>
                                <CTableDataCell style={{
                                    color: theme.colorPrimary,
                                    fontWeight: theme.semiBoldTextPrimary,
                                    fontSize: "0.8rem",
                                }}
                                >
                                    <CAvatar
                                        src={user?.avatar}
                                        size="xl"
                                        style={{ width: "30px", height: "30px" }}
                                    />
                                </CTableDataCell>

                                <CTableDataCell style={{
                                    color: theme.colorPrimary,
                                    fontWeight: theme.semiBoldTextPrimary,
                                    fontSize: "0.8rem",
                                }}
                                >
                                    {user.name}
                                </CTableDataCell>

                                <CTableDataCell style={{
                                    color: theme.colorPrimary,
                                    fontSize: "0.8rem",
                                    fontWeight: 'bold',
                                }}
                                >
                                    {user.email}
                                </CTableDataCell>
                                {
                                    type === "usuario" ?
                                        <CTableDataCell style={{
                                            color: theme.colorPrimary, fontWeight: theme.semiBoldTextPrimary,
                                            fontSize: "0.8rem",
                                        }}
                                        >
                                            {user.phone}
                                        </CTableDataCell> :
                                        <CTableDataCell style={{
                                            color: getStatusColor(user.status), fontWeight: theme.semiBoldTextPrimary,
                                            fontSize: "0.8rem",
                                        }}
                                        >
                                            {user.status}
                                        </CTableDataCell>
                                }

                                <CTableDataCell style={{
                                    color: theme.colorPrimary, fontWeight: theme.semiBoldTextPrimary,
                                    fontSize: "0.8rem",
                                }}
                                >
                                    <CTooltip content={toolTip[0]} placement="bottom">
                                        <RiDeleteBin6Line
                                            style={{
                                                color: theme.errorColor,
                                                cursor: 'pointer'
                                            }}
                                            className='mx-2'
                                            onClick={() => onDelete(user._id)}
                                            size={20}
                                        />
                                    </CTooltip>
                                    <CTooltip content={toolTip[1]} placement="bottom">
                                        <MdOutlineModeEdit
                                            style={{ color: "black", cursor: 'pointer' }}
                                            className='mx-2' size={20}
                                            onClick={() => captuData(true, user._id)}



                                        />
                                    </CTooltip>
                                </CTableDataCell>

                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable> :
                <CTable>
                    <CTableHead>
                        <CTableRow className='text-start'>
                            {headerSmall.map((header, index) => (
                                <CTableHeaderCell key={index} scope="col" className='pb-4'>
                                    {header}
                                </CTableHeaderCell>
                            ))}
                        </CTableRow>
                    </CTableHead>
                    <CTableBody style={{ marginTop: '20px' }}>
                        {data.map((user, index) => (
                            <CTableRow key={index} className='text-start'>
                                <CTableDataCell style={{
                                    color: theme.colorPrimary,
                                    fontWeight: theme.semiBoldTextPrimary,
                                    fontSize: "0.8rem",
                                }}
                                >
                                    {user.name}
                                    <div style={{ fontWeight: 'bold' }}>{user.email}</div>
                                </CTableDataCell>
                                {
                                    type === "usuario" ?
                                        <CTableDataCell style={{
                                            color: theme.colorPrimary, fontWeight: theme.semiBoldTextPrimary,
                                            fontSize: "0.8rem",
                                        }}
                                        >
                                            {user.phone}
                                        </CTableDataCell> : <CTableDataCell style={{
                                            color: getStatusColor(user.status), fontWeight: theme.semiBoldTextPrimary,
                                            fontSize: "0.8rem",
                                        }}
                                        >
                                            {user.status}
                                        </CTableDataCell>
                                }

                                <CTableDataCell style={{
                                    color: theme.colorPrimary, fontWeight: theme.semiBoldTextPrimary,
                                    fontSize: "0.8rem",
                                }}
                                >
                                    <CTooltip content={toolTip[0]} placement="bottom" key={user._id}>
                                        <RiDeleteBin6Line style={{ color: theme.errorColor, cursor: 'pointer' }} size={20}
                                            className='mx-2' onClick={() => onDelete(user._id)} />
                                    </CTooltip>
                                    <CTooltip content={toolTip[1]} placement="bottom" key={user._id}>
                                        <MdOutlineModeEdit
                                            style={{ color: "black", cursor: 'pointer' }}
                                            className='mx-2'
                                            size={20}
                                            onClick={() => captuData(true, user._id)}
                                        />
                                    </CTooltip>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            }
        </CRow>
    );
}