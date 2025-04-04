import { useState, useEffect } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CFormSelect,
    CFormInput,
    CButton,
    CAlert,
    CListGroup,
    CListGroupItem,
    CBadge,
    CCol,
    CRow,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CTooltip,
    CSpinner,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter
} from '@coreui/react';
import { theme } from '../../theme';
import { FaKey, FaTrashAlt, FaEye, FaEyeSlash, FaCopy, FaShieldAlt, FaHistory } from 'react-icons/fa';

const INTEGRATION_OPTIONS = [
    {
        category: "Identity Providers",
        options: [
            "Okta (SSO)",
            "Active Directory",
            "Auth0",
            "Keycloak",
            "Azure AD",
            "Google Identity",
            "AWS IAM"
        ]
    },
    {
        category: "MFA/SSO Solutions",
        options: [
            "Duo Security (MFA)",
            "Ping Identity",
            "AWS Cognito",
            "OneLogin",
            "JumpCloud"
        ]
    },
];

interface ApiKey {
    id: string;
    service: string;
    key: string;
    createdAt: string;
    lastUsed?: string;
    description?: string;
    isActive: boolean;
    showKey?: boolean;
}

export const SettingUser = () => {
    const [selectedService, setSelectedService] = useState<string>('');
    const [apiKey, setApiKey] = useState<string>('');
    const [keyDescription, setKeyDescription] = useState<string>('');
    const [savedKeys, setSavedKeys] = useState<ApiKey[]>([]);
    const [message, setMessage] = useState<{ text: string, color: string } | null>(null);
    const [showKey, setShowKey] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        setLoading(true);
        const storedKeys = localStorage.getItem('apiKeys');
        if (storedKeys) {
            try {
                const parsedKeys = JSON.parse(storedKeys);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const migratedKeys = parsedKeys.map((key: any) => ({
                    ...key,
                    id: key.id || generateId(),
                    isActive: key.isActive !== false,
                    showKey: false
                }));
                setSavedKeys(migratedKeys);
            } catch (e) {
                console.error("Error loading API keys", e);
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (savedKeys.length > 0) {
            localStorage.setItem('apiKeys', JSON.stringify(savedKeys));
        } else {
            localStorage.removeItem('apiKeys');
        }
    }, [savedKeys]);

    const generateId = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    };

    const handleAddKey = () => {
        if (!selectedService || !apiKey) {
            showMessage('Debes seleccionar un servicio e ingresar una API Key', 'danger');
            return;
        }

        const newKey: ApiKey = {
            id: generateId(),
            service: selectedService,
            key: apiKey,
            description: keyDescription,
            createdAt: new Date().toISOString(),
            isActive: true,
            showKey: false
        };

        setSavedKeys([...savedKeys, newKey]);
        showMessage('API Key agregada correctamente', 'success');
        resetForm();
    };

    const showMessage = (text: string, color: string) => {
        setMessage({ text, color });
        setTimeout(() => setMessage(null), 5000);
    };

    const resetForm = () => {
        setSelectedService('');
        setApiKey('');
        setKeyDescription('');
        setShowKey(false);
    };

    const confirmDelete = (id: string) => {
        setKeyToDelete(id);
        setShowConfirmModal(true);
    };

    const handleDelete = () => {
        if (keyToDelete) {
            setSavedKeys(savedKeys.filter(key => key.id !== keyToDelete));
            showMessage('API Key eliminada', 'warning');
        }
        setShowConfirmModal(false);
        setKeyToDelete(null);
    };

    const toggleKeyStatus = (id: string) => {
        setSavedKeys(savedKeys.map(key =>
            key.id === id ? { ...key, isActive: !key.isActive } : key
        ));
    };

    const toggleShowKey = (id: string) => {
        setSavedKeys(savedKeys.map(key =>
            key.id === id ? { ...key, showKey: !key.showKey } : key
        ));
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        showMessage('Copiado al portapapeles', 'info');
    };

    const filteredKeys = savedKeys.filter(key => {
        if (filter === 'active') return key.isActive;
        if (filter === 'inactive') return !key.isActive;
        return true;
    });

    return (
        <div className="settings-container m-5">
            <CCard className="mb-4">
                <CCardHeader style={{
                    backgroundColor: theme.colorPrimary,
                    color: 'white',
                    borderBottom: 'none'
                }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">
                            <FaShieldAlt className="me-2" />
                            Gestión de Credenciales Empresariales
                        </h5>
                        <CBadge color="light" className="text-dark">
                            {savedKeys.length} credenciales registradas
                        </CBadge>
                    </div>
                </CCardHeader>

                <CCardBody>
                    {message && (
                        <CAlert color={message.color} className="mb-4 d-flex align-items-center">
                            <FaShieldAlt className="me-2" />
                            {message.text}
                        </CAlert>
                    )}

                    <CAccordion activeItemKey={1}>
                        <CAccordionItem itemKey={1}>
                            <CAccordionHeader>
                                <h6 className="mb-0">
                                    <FaKey className="me-2" />
                                    Agregar Nueva Credencial
                                </h6>
                            </CAccordionHeader>
                            <CAccordionBody>
                                <CRow className="g-3">
                                    <CCol md={6}>
                                        <CFormSelect
                                            value={selectedService}
                                            onChange={(e) => setSelectedService(e.target.value)}
                                            className="mb-3"
                                        >
                                            <option value="">Seleccione un servicio...</option>
                                            {INTEGRATION_OPTIONS.map((group, index) => (
                                                <optgroup key={index} label={group.category}>
                                                    {group.options.map((service, i) => (
                                                        <option key={`${index}-${i}`} value={service}>{service}</option>
                                                    ))}
                                                </optgroup>
                                            ))}
                                        </CFormSelect>
                                    </CCol>

                                    <CCol md={6}>
                                        <CFormInput
                                            type={showKey ? "text" : "password"}
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder="Ingrese su API Key"
                                            addonText={
                                                <CTooltip content={showKey ? "Ocultar clave" : "Mostrar clave"}>
                                                    <CButton
                                                        type="button"
                                                        color="secondary"
                                                        size="sm"
                                                        onClick={() => setShowKey(!showKey)}
                                                    >
                                                        {showKey ? <FaEyeSlash /> : <FaEye />}
                                                    </CButton>
                                                </CTooltip>
                                            }
                                        />
                                    </CCol>

                                    <CCol md={12}>
                                        <CFormInput
                                            type="text"
                                            value={keyDescription}
                                            onChange={(e) => setKeyDescription(e.target.value)}
                                            placeholder="Descripción (opcional) - Ej: 'Key para producción'"
                                        />
                                    </CCol>

                                    <CCol md={12} className="d-flex justify-content-end">
                                        <CButton
                                            color="primary"
                                            onClick={handleAddKey}
                                            style={{ backgroundColor: theme.colorPrimary }}
                                            className="px-4"
                                        >
                                            <FaKey className="me-2" />
                                            Registrar Credencial
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CAccordionBody>
                        </CAccordionItem>
                    </CAccordion>

                    <div className="mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5>
                                <FaHistory className="me-2" />
                                Credenciales Registradas
                            </h5>

                            <div className="d-flex align-items-center">
                                <span className="me-2">Filtrar:</span>
                                <CFormSelect
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    style={{ width: '120px' }}
                                >
                                    <option value="all">Todas</option>
                                    <option value="active">Activas</option>
                                    <option value="inactive">Inactivas</option>
                                </CFormSelect>
                            </div>
                        </div>

                        {loading ? (
                            <div className="text-center py-5">
                                <CSpinner color="primary" />
                                <p className="mt-2">Cargando credenciales...</p>
                            </div>
                        ) : filteredKeys.length === 0 ? (
                            <CAlert color="secondary" className="text-center py-4">
                                <FaKey className="mb-3" size={24} />
                                <h5>No hay credenciales registradas</h5>
                                <p className="mb-0">Agrega tu primera credencial para comenzar</p>
                            </CAlert>
                        ) : (
                            <CListGroup>
                                {filteredKeys.map((item) => (
                                    <CListGroupItem
                                        key={item.id}
                                        className="d-flex justify-content-between align-items-start"
                                        style={{
                                            opacity: item.isActive ? 1 : 0.7,
                                            borderLeft: `4px solid ${item.isActive ? theme.colorSuccess : theme.colorWarning}`
                                        }}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold d-flex align-items-center">
                                                {item.service}
                                                <CBadge
                                                    color={item.isActive ? 'success' : 'warning'}
                                                    className="ms-2"
                                                    shape="rounded-pill"
                                                >
                                                    {item.isActive ? 'ACTIVA' : 'INACTIVA'}
                                                </CBadge>
                                            </div>
                                            <small className="text-muted">
                                                {item.description || 'Sin descripción'}
                                            </small>
                                            <div className="mt-2">
                                                <small className="text-muted">
                                                    <FaHistory className="me-1" />
                                                    Creada: {new Date(item.createdAt).toLocaleString()}
                                                </small>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <div className="me-2" style={{ width: '150px' }}>
                                                <CFormInput
                                                    type={item.showKey ? "text" : "password"}
                                                    value={item.key}
                                                    readOnly
                                                    className="bg-light"
                                                />
                                            </div>

                                            <CTooltip content={item.showKey ? "Ocultar clave" : "Mostrar clave"}>
                                                <CButton
                                                    color="secondary"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => toggleShowKey(item.id)}
                                                >
                                                    {item.showKey ? <FaEyeSlash /> : <FaEye />}
                                                </CButton>
                                            </CTooltip>

                                            <CTooltip content="Copiar clave">
                                                <CButton
                                                    color="light"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => copyToClipboard(item.key)}
                                                >
                                                    <FaCopy />
                                                </CButton>
                                            </CTooltip>

                                            <CTooltip content={item.isActive ? "Desactivar" : "Activar"}>
                                                <CButton
                                                    color={item.isActive ? "warning" : "success"}
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => toggleKeyStatus(item.id)}
                                                >
                                                    {item.isActive ? 'Desactivar' : 'Activar'}
                                                </CButton>
                                            </CTooltip>

                                            <CTooltip content="Eliminar">
                                                <CButton
                                                    color="danger"
                                                    size="sm"
                                                    onClick={() => confirmDelete(item.id)}
                                                >
                                                    <FaTrashAlt />
                                                </CButton>
                                            </CTooltip>
                                        </div>
                                    </CListGroupItem>
                                ))}
                            </CListGroup>
                        )}
                    </div>
                </CCardBody>
            </CCard>

            <CModal visible={showConfirmModal} onClose={() => setShowConfirmModal(false)} backdrop="static"
                alignment="center"
                size="lg">
                <CModalHeader closeButton>
                    <CModalTitle>Confirmar Eliminación</CModalTitle>
                </CModalHeader>
                <CModalBody>
                    ¿Estás seguro que deseas eliminar esta credencial? Esta acción no se puede deshacer.
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancelar
                    </CButton>
                    <CButton color="danger" onClick={handleDelete}>
                        Eliminar
                    </CButton>
                </CModalFooter>
            </CModal>
        </div>
    );
};