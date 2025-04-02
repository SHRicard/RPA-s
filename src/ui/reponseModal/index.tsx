import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from '@coreui/react';
import { BtnPrimary } from '../btnPrimary';
import { useForm } from 'react-hook-form';
import { CustomInput } from '../customInput';
import { useRefresh } from '../../store/useRefresh';

interface ResponseModalProps {
    show: boolean;
    onClose: (status: boolean) => void;
    id: number
}

type FormData = {
    response: string;
};

export const ResponseModal = ({ show, onClose, id }: ResponseModalProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { triggerRefresh } = useRefresh();


    const handleFormSubmit = (data: FormData) => {
        const newMessage = {
            type: "admin",
            message: data.response,
            timestamp: new Date().toISOString(),
            adminName: "Ricardo Méndez"
        };

        const storedResponses = localStorage.getItem("responses");
        const responses = storedResponses ? JSON.parse(storedResponses) : {};

        if (!responses[id]) {
            responses[id] = [];
        }
        responses[id].push(newMessage);

        localStorage.setItem("responses", JSON.stringify(responses));
        triggerRefresh()
        reset();
        onClose(true);
    };

    return (
        <CModal
            visible={show}
            onClose={() => onClose(false)}
            backdrop="static"
            alignment="center"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <CModalHeader closeButton>
                    <CModalTitle>Responder a la conversación</CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <div className="text-start py-1">
                        <CustomInput
                            size="sm"
                            label="Tu respuesta"
                            type="textarea"
                            id="response"
                            register={register}
                            validationRules={{
                                required: "La respuesta es obligatoria",
                                minLength: {
                                    value: 10,
                                    message: "La respuesta debe tener al menos 10 caracteres"
                                }
                            }}
                            errorMessage={errors.response?.message as string}
                            required={true}
                            rows={5}
                            placeholder="Escribe tu respuesta aquí..."
                        />
                    </div>
                </CModalBody>
                <CModalFooter>
                    <BtnPrimary
                        label="Cancelar"
                        color="secondary"
                        onClick={() => onClose(false)}
                        type="button"
                    />
                    <BtnPrimary
                        label={"Enviar respuesta"}
                        color="primary"
                        type="submit"
                    />
                </CModalFooter>
            </form>
        </CModal>
    );
};