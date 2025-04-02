import {
    CModal,
    CModalBody,
    CButton,
    CForm,
    CCol,
    CRow,
} from '@coreui/react';
import { BtnPrimary } from '../btnPrimary';
import { CustomInput } from '../customInput';
import { useForm } from 'react-hook-form';
import { theme } from '../../theme';
import { CustomSelect } from '../customSelect';

interface AddResourcesModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
}
const getFormattedDate = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
};
export const AddResourcesModal: React.FC<AddResourcesModalProps> = ({ show, onClose }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        const { title, description, priority, type } = data;

        const newResource = {
            _id: Date.now(),
            type,
            title,
            description,
            date: getFormattedDate(),
            priority,
        };

        const existingResources = JSON.parse(localStorage.getItem('miResources') || '[]');

        existingResources.push(newResource);
        localStorage.setItem('miResources', JSON.stringify(existingResources));
        reset();
        onClose(false);
    };

    return (
        <CModal visible={show} onClose={() => onClose(false)} alignment="center" size='lg'>
            <CModalBody>
                <CCol md={12} className="text-start mx-4 pt-4">
                    <strong style={{ color: theme.colorPrimary, fontSize: "1rem" }}>
                        Agregar Nuevo Recurso
                    </strong>
                    <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                        Los recursos que agregues en este apartado se verán reflejados en la sección correspondiente de la app. Este espacio está dedicado a las actualizaciones, mantenimientos y otras notificaciones importantes.
                    </p>
                    <ol style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                        <li>Haz clic en el botón "Agregar Recurso".</li>
                        <li>En el campo "Título", escribe el título del recurso.</li>
                        <li>En el campo "Descripción", agrega información detallada sobre el recurso.</li>
                        <li>Especifica la prioridad, tipo de recurso (notificación, mantenimiento, actualización) y la fecha.</li>
                        <li>Una vez completado, haz clic en el botón "Agregar Recurso" para guardar el recurso.</li>
                    </ol>
                </CCol>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-start py-1">
                        <CustomInput
                            label="Título del Recurso"
                            placeholder="Ej: Nueva actualización"
                            size="sm"
                            type="text"
                            id="title"
                            register={register}
                            required={true}
                            validationRules={{
                                required: "El título es obligatorio",
                            }}
                            errorMessage={errors.title?.message as string}
                        />
                    </div>
                    <div className="text-start py-1">
                        <CustomInput
                            disabled={false}
                            size="sm"
                            label="Descripción del Recurso"
                            type="textarea"
                            id="description"
                            register={register}
                            validationRules={{ minLength: 10 }}
                            errorMessage={errors.description?.message as string}
                            required={true}
                            rows={5}
                            placeholder="Escribe la descripción del recurso aquí..."
                        />
                    </div>
                    <div className="text-start py-1">
                        <CustomSelect
                            label="Prioridad"
                            id="priority"
                            errorMessage={errors.priority?.message as string}
                            register={register}
                            validationRules={{ required: true }}
                            options={[
                                "alta",
                                "media",
                                "baja",

                            ]}
                            required={false}
                        />
                    </div>
                    <div className="text-start py-1">
                        <CustomSelect
                            label="Tipo"
                            errorMessage={errors.type?.message as string}
                            register={register}
                            validationRules={{ required: true }}
                            options={[
                                "notificación",
                                "mantenimiento",
                                "actualización",

                            ]}
                            required={false}
                            id="type"
                        />
                    </div>
                    <CRow>
                        <CCol className="d-grid pt-4">
                            <BtnPrimary label="Agregar Recurso" color="primary" type="submit" />
                        </CCol>
                        <CCol className="d-grid pt-4">
                            <CButton color="secondary" onClick={() => onClose(false)}>Cerrar</CButton>
                        </CCol>
                    </CRow>
                </CForm>
            </CModalBody>
        </CModal>
    );
};
