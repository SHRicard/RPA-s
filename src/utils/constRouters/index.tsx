import { cilGroup, cilHeadphones, cilShieldAlt, cibAndroidAlt, cilSettings, cilInfo } from '@coreui/icons';

export const dashboard = [
    {
        role: "admin",
        rotuer: ["/dashboard-admin", "/profile-admin"],
        text: []
    },
    {
        role: "user",
        rotuer: ["/dashboard-user", "/profile-user"],
        text: []
    }
]

export const allRouter = [
    {
        role: "admin",
        rotuer: ["/user-management", "/support-admin", "/security-admin"],
        text: ["Gestión de usuario", "Soporte", "Seguridad"],
        icons: [cilGroup, cilHeadphones, cilShieldAlt]
    },
    {
        role: "user",
        rotuer: ["/dashboard-user", "/faq-user", "/settings-user", "/support-user"],
        text: ["RPA’s", "Pr. Frecuentes", "Configuración", "Soporte IA"],
        icons: [cibAndroidAlt, cilInfo, cilSettings, cibAndroidAlt]
    }
]


