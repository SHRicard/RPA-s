import { CCard, CCardBody, CCardTitle, CCardText, CImage, CCardHeader, CTooltip } from "@coreui/react";
import BOT from "../../../public/BOTS.png";
import { theme } from "../../theme";
import { BtnPrimary } from "../btnPrimary";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { ModalErrorShutdown } from "../ModalErrorShutdown";
import { useState } from "react";
import { DeleteBotModal } from "../deleteModalBots";
import { IBots } from "../../interface";

// interface Process {
//     name: string;
//     steps: string[];
//     frequency: string;
//     dataTypes: string[];
//     workflow: string[];
//     integrations: string[];
// }

// interface IBots {
//     id: string;
//     name: string;
//     type: string;
//     status: string;
//     processes: Process;
//     version?: string;
//     createdAt?: string;
//     lastUpdate?: string;

// }

interface IBot {
    bot: IBots
    refresh: boolean,
    setRefresh: (pros: boolean) => void
}

export const SmallBotCard = ({
    bot,
    refresh,
    setRefresh
}: IBot) => {
    const { id, name, status, createdAt, lastUpdate } = bot;
    const navigate = useNavigate();
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleProfileRPAs = (id: string) => {
        navigate(`/profile-rpas-user/${id}`);
    };

    const deleteRPAs = (id: string) => {
        const storedBots = localStorage.getItem("bots");
        if (!storedBots) return;

        const bots = JSON.parse(storedBots);

        const selectedBot = bots.find((bot: { id: string; status: string }) => bot.id === id);
        if (!selectedBot) return;

        if (selectedBot.status === "active") {
            setShowErrorModal(true);
            return;
        }
        setShowDeleteModal(true)

    };

    const closeDeleteRPA = () => {
        setShowDeleteModal(false)
    }

    return (
        <CCard className="m-2">
            <CCardHeader className="py-2" >
                <div className="d-flex justify-content-between align-items-center">
                    <span
                        className="fw-bold"
                        style={{
                            textTransform: 'uppercase',
                            fontSize: '0.75rem',
                            color: theme.colorPrimary,

                        }}
                    >
                        {status}
                    </span>

                    <CTooltip content="Borrar Bot" placement="bottom" key={id}>
                        <RiDeleteBin6Line
                            style={{
                                color: theme.errorColor,
                                cursor: 'pointer'
                            }}
                            size={20}
                            onClick={() => deleteRPAs(id)}
                        />
                    </CTooltip>
                </div>
            </CCardHeader>

            <CCardBody className="p-3 d-flex flex-column">
                <div className="text-center mb-3">
                    <CImage
                        src={BOT}
                        width={100}
                        height={100}
                        className="img-fluid mx-auto"
                    />
                </div>

                <CCardTitle
                    className="h6 mb-2 text-truncate text-center fw-bold"
                    style={{
                        color: theme.colorPrimary,
                        fontSize: "1rem"
                    }}
                >
                    {name}
                </CCardTitle>

                <CCardText className="small text-center">
                    <div className="d-flex flex-column align-items-center mb-2">
                        <span className="fw-bold">Creado:</span>
                        <span className="text-muted">{createdAt}</span>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                        <span className="fw-bold">Actualizado:</span>
                        <span className="text-muted">{lastUpdate}</span>
                    </div>
                </CCardText>

                <div className="mt-auto pt-3">
                    <BtnPrimary
                        label="Ver Detalles"
                        color="primary"
                        type="button"
                        onClick={() => handleProfileRPAs(id)}
                    />
                </div>
            </CCardBody>
            <ModalErrorShutdown show={showErrorModal} setShow={setShowErrorModal} robotName={name} />
            <DeleteBotModal
                show={showDeleteModal}
                botId={id}
                onClose={closeDeleteRPA}
                botName={name}
                refresh={refresh}
                setRefresh={setRefresh}

            />
        </CCard>
    );
};

