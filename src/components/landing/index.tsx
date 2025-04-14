import { CRow, CCol, CImage, CContainer } from '@coreui/react';
import { BtnPrimary } from '../../ui';
import { theme } from '../../theme';
import { FaRegHeart, FaRobot, FaChartLine, FaShieldAlt } from 'react-icons/fa';
import { MdOutlineChecklist, MdIntegrationInstructions, } from 'react-icons/md';
import { LuMessageSquareMore } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import './index.css';
import { GoWorkflow } from 'react-icons/go';

const HeaderLanding = () => {
    return (
        <div className="header-landing">
            <div className="header-overlay"></div>
            <div className="header-content">
                <CRow className='d-flex justify-content-center align-items-center'>
                    <CCol xs={12} className="header-title">
                        <h1>Automatización inteligente para tu negocio</h1>
                    </CCol>
                    <CCol xs={12} sm={10} md={8} className="header-description">
                        <p>
                            Transforma tus procesos empresariales con nuestra plataforma de automatización robótica que optimiza tareas repetitivas, mejora la gestión de datos y libera a tu equipo para enfocarse en lo estratégico.
                        </p>
                    </CCol>
                    <CCol xs={12} className="header-buttons">
                        <Link to="/login">
                            <BtnPrimary label="Iniciar sesión" color="primary" type="submit" />
                        </Link>
                        <Link to="/register">
                            <BtnPrimary label="Registrarse" color="secondary" type="button" />
                        </Link>
                    </CCol>
                </CRow>
            </div>
        </div>
    );
};


const AudienceSection = () => {
    return (
        <div className="audience-section">
            <div className="audience-overlay"></div>

            <CContainer>
                <div className="audience-content">
                    <CCol xs={12} className="section-title">
                        <h2 style={{ color: "white" }}>
                            ¿Eres parte de esta audiencia? Entonces, esta plataforma es para ti
                            <div className="title-divider"></div>
                        </h2>
                    </CCol>
                    <CRow className="audience-cards">
                        <CCol lg={4} className="audience-card">
                            <FaRobot size={48} className="card-icon" />
                            <h4>Empresas en expansión</h4>
                            <p>Optimiza productividad y eficiencia operativa durante tu crecimiento.</p>
                        </CCol>
                        <CCol lg={4} className="audience-card">
                            <GoWorkflow size={48} className="card-icon" />
                            <h4>Directivos y responsables</h4>
                            <p>Automatiza procesos y reduce tareas repetitivas en tu organización.</p>
                        </CCol>
                        <CCol lg={4} className="audience-card">
                            <MdIntegrationInstructions size={48} className="card-icon" />
                            <h4>Equipos de tecnología</h4>
                            <p>Integra herramientas y aplicaciones de manera efectiva y sin complicaciones.</p>
                        </CCol>
                        <CCol lg={4} className="audience-card">
                            <FaChartLine size={48} className="card-icon" />
                            <h4>Sectores especializados</h4>
                            <p>Finanzas, logística, atención al cliente y RRHH encontrarán soluciones a medida.</p>
                        </CCol>
                    </CRow>
                </div>
            </CContainer>
        </div>
    );
};

export default AudienceSection;


const FeaturesSection = () => {
    return (
        <section className="features-section">
            <CContainer>
                <CRow className="features-row">
                    {/* Columna de Funcionalidades */}
                    <CCol lg={6} className="features-column">
                        <div className="features-content">
                            <h2 className="section-title">
                                Funcionalidades diseñadas para optimizar cada proceso
                                <span className="title-divider"></span>
                            </h2>

                            <div className="features-list">
                                <div className="feature-item">
                                    <div className="feature-icon-container">
                                        <GoWorkflow className="feature-icon" />
                                    </div>
                                    <div className="feature-content">
                                        <h3>Flujos de trabajo personalizados</h3>
                                        <p>Diseña y gestiona procesos de forma intuitiva y adaptada a tus necesidades específicas.</p>
                                    </div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon-container">
                                        <FaChartLine className="feature-icon" />
                                    </div>
                                    <div className="feature-content">
                                        <h3>Control y optimización</h3>
                                        <p>Supervisa el rendimiento en tiempo real y mejora resultados rápidamente.</p>
                                    </div>
                                </div>

                                <div className="feature-item">
                                    <div className="feature-icon-container">
                                        <FaShieldAlt className="feature-icon" />
                                    </div>
                                    <div className="feature-content">
                                        <h3>Escalabilidad eficiente</h3>
                                        <p>Ajusta la capacidad según los requerimientos cambiantes de tu negocio.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>

                    {/* Columna de Beneficios */}
                    <CCol lg={6} className="benefits-column">
                        <div className="benefits-content">
                            <h2 className="section-title">
                                Descubre los beneficios de una automatización eficiente
                                <span className="title-divider"></span>
                            </h2>

                            <p className="benefits-intro">
                                Impulsa la eficiencia operativa de tu empresa con soluciones que reducen costos y liberan recursos humanos.
                            </p>

                            <div className="benefits-grid">
                                <div className="benefit-card">
                                    <div className="benefit-icon">✓</div>
                                    <div className="benefit-text">
                                        <h4>Reducción de errores</h4>
                                        <p>Minimiza fallos humanos en procesos repetitivos.</p>
                                    </div>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">⏱️</div>
                                    <div className="benefit-text">
                                        <h4>Ahorro de tiempo</h4>
                                        <p>Hasta un 80% menos tiempo en tareas rutinarias.</p>
                                    </div>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">🔄</div>
                                    <div className="benefit-text">
                                        <h4>Integración perfecta</h4>
                                        <p>Compatibilidad con tus sistemas actuales.</p>
                                    </div>
                                </div>

                                <div className="benefit-card">
                                    <div className="benefit-icon">🔒</div>
                                    <div className="benefit-text">
                                        <h4>Seguridad garantizada</h4>
                                        <p>Cumplimiento normativo y protección de datos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </CContainer>
        </section>
    );
};



const UniqueFeatures = () => {
    return (
        <section className="unique-features" style={{ backgroundColor: theme.colorPrimary, color: "white" }}>
            <CContainer>
                <CCol xs={12} className="section-title">
                    <h2 style={{ color: theme.colorWhite }}>
                        ¿Qué hace que nuestras soluciones sean únicas?
                        <div className="title-divider"></div>
                    </h2>
                    <p className="section-subtitle" style={{ color: "white" }}>
                        Tecnología innovadora diseñada para potenciar tu negocio
                    </p>
                </CCol>
                <CRow className="" >
                    <CCol md={4} className="unique-feature" >
                        <div className="feature-icon-circle">
                            <FaRegHeart size={48} />
                        </div>
                        <h4 style={{ color: "white" }}>Optimización de recursos</h4>
                        <p style={{ color: "white" }}>
                            Aprovecha la automatización para mejorar la eficiencia operativa, reducir costos y liberar tiempo de tu equipo para actividades de mayor valor estratégico.
                        </p>
                    </CCol>
                    <CCol md={4} className="unique-feature" >
                        <div className="feature-icon-circle">
                            <MdOutlineChecklist size={48} />
                        </div>
                        <h4 style={{ color: "white" }}>Mejora continua</h4>
                        <p style={{ color: "white" }}>
                            Adapta tus procesos rápidamente a los cambios del mercado con nuestra plataforma flexible que evoluciona con tus necesidades.
                        </p>
                    </CCol>
                    <CCol md={4} className="unique-feature">
                        <div className="feature-icon-circle">
                            <LuMessageSquareMore size={48} />
                        </div>
                        <h4 style={{ color: "white" }}>Protección de datos</h4>
                        <p style={{ color: "white" }}>
                            Conecta tus sistemas existentes con total seguridad, cumpliendo con las normativas más exigentes para proteger tu información sensible.
                        </p>
                    </CCol>
                </CRow>
            </CContainer>
        </section>
    );
};

const CTA = () => {
    return (
        <div className="cta-section">
            <CContainer>
                <CRow className="cta-row">

                    <CCol lg={12} className="d-flex justify-content-center align-items-center text-center">
                        <h2>¡Da el siguiente paso hacia una gestión empresarial más eficiente!</h2>

                    </CCol>
                    <CCol lg={12} className="d-flex justify-content-center align-items-center text-center">
                        <p>
                            La automatización con robots de software optimiza tareas repetitivas de forma flexible y escalable. Facilita la integración con tus sistemas actuales, mejora la gestión de datos y permite que tu equipo se concentre en actividades estratégicas.
                        </p>
                    </CCol>
                    <CCol lg={12} className="d-flex justify-content-center align-items-center ">
                        <Link to="/login" className='mx-2'>
                            <BtnPrimary label="Comenzar ahora" color="primary" type="submit" />
                        </Link>
                        <Link to="/contact" className='mx-2'>
                            <BtnPrimary label="Hablar con un experto" color="white" type="button" />
                        </Link>
                    </CCol>

                </CRow>
            </CContainer>
        </div>
    );
};

const FooterLanding = () => {
    return (
        <footer className="footer-landing">
            <CContainer>
                <CRow className="">
                    <CCol lg={3} md={6} className="footer-col">
                        <div className="footer-logo">
                            <CImage rounded src="../../../public/RPAs_LOGO.png" width={180} />
                        </div>
                        <p>
                            Líderes en soluciones de automatización empresarial que transforman la manera en que trabajas.
                        </p>
                    </CCol>
                    <CCol lg={3} md={6} className="footer-col">
                        <h5>Navegación</h5>
                        <ul>
                            <li><Link to="/about">Nosotros</Link></li>
                            <li><Link to="/platform">Plataforma</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                        </ul>
                    </CCol>
                    <CCol lg={3} md={6} className="footer-col">
                        <h5>Soluciones</h5>
                        <ul>
                            <li><Link to="/services">Servicios</Link></li>
                            <li><Link to="/features">Funcionalidades</Link></li>
                            <li><Link to="/benefits">Beneficios</Link></li>
                            <li><Link to="/industries">Industrias</Link></li>
                        </ul>
                    </CCol>
                    <CCol lg={3} md={6} className="footer-col">
                        <h5>Legal</h5>
                        <ul>
                            <li><Link to="/terms">Términos y Condiciones</Link></li>
                            <li><Link to="/privacy">Políticas de Privacidad</Link></li>
                            <li><Link to="/cookies">Política de Cookies</Link></li>
                        </ul>
                    </CCol>
                </CRow>
                <div className="footer-bottom py-3">
                    <CRow>
                        <CCol md={6} className="copyright">
                            <p>© {new Date().getFullYear()} RRicardo. Todos los derechos reservados.</p>
                        </CCol>
                        <CCol md={6} className="social-links">
                            <a href="#">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                            <a href="#">Instagram</a>
                        </CCol>
                    </CRow>
                </div>
            </CContainer>
        </footer>
    );
};

export const Landing = () => {
    return (
        <div className="landing-page">
            <HeaderLanding />
            <FeaturesSection />
            <AudienceSection />
            <UniqueFeatures />
            <CTA />
            <FooterLanding />
        </div>
    );
};