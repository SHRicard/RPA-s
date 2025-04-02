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
import { useUser } from '../../hooks';


interface FAQModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
}

export const AddFAQModal: React.FC<FAQModalProps> = ({ show, onClose, }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dataUser = useUser()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        const question = data.name;
        const answer = data.mensaje;

        const newFAQ = {
            id: Date.now().toString(),
            question,
            answer,
            admin: {
                id: dataUser?._id || '',
                name: dataUser?.name || '',
            },
        };
        const existingFAQs = JSON.parse(localStorage.getItem('miFAQ') || '[]');
        existingFAQs.push(newFAQ);
        localStorage.setItem('miFAQ', JSON.stringify(existingFAQs));
        reset()
        onClose(false);
    };

    return (
        <CModal visible={show} onClose={() => onClose(false)} alignment="center" size='lg'>
            <CModalBody>
                <CCol md={12} className="text-start mx-4 pt-4">
                    <strong style={{ color: theme.colorPrimary, fontSize: "1rem" }}>
                        Agregar Preguntas Frecuentes Personalizadas
                    </strong>
                    <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                        Las preguntas que agregues en este apartado se verán reflejadas en el apartado "Ver Pregunta". Este espacio está dedicado a las preguntas que tú mismo agregues, y simultáneamente, esas preguntas se mostrarán en los perfil de usuario, en la sección de Preguntas Frecuentes.
                    </p>
                    <ol style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                        <li>Haz clic en el botón "Agregar Pregunta".</li>
                        <li>En el campo "Pregunta", escribe la pregunta que deseas agregar.</li>
                        <li>En el campo "Respuesta", agrega la información detallada o la respuesta a la pregunta.</li>
                        <li>Una vez completado, haz clic en el botón "Agregar Pregunta" para guardar la pregunta y respuesta.</li>
                    </ol>
                    <p style={{ fontSize: "0.9rem", color: theme.colorSecondary }}>
                        Si deseas agregar más preguntas frecuentes, repite este proceso.
                    </p>
                </CCol>
                <CForm onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-start py-1">
                        <CustomInput
                            label="Agrega la Pregunta"
                            placeholder={"Ej: ¿Cómo puedo crear un bot para responder mensajes en WhatsApp?"}
                            size="sm"
                            type="text"
                            id="name"
                            register={register}
                            required={true}
                            validationRules={{
                                required: "La pregunta es obligatorio",
                            }}
                            errorMessage={errors.name?.message as string}
                        />
                    </div>
                    <div className="text-start py-1">
                        <CustomInput
                            disabled={false}
                            size="sm"
                            label="Agrega la Repuesta"
                            type="textarea"
                            id="mensaje"
                            register={register}
                            validationRules={{ minLength: 10 }}
                            errorMessage={errors.mensaje?.message as string}
                            required={true}
                            rows={5}
                            placeholder="Escribe tu mensaje aquí..."
                        />
                    </div>
                    <CRow>
                        <CCol className="d-grid pt-4">
                            <BtnPrimary label="Agregar Pregunta ?" color="primary" type="submit" />
                        </CCol>
                        <CCol className="d-grid pt-4">
                            <CButton color="secondary" onClick={() => onClose(false)}>No Cerrar</CButton>
                        </CCol>
                    </CRow>


                </CForm>

            </CModalBody>
        </CModal>
    );
};


