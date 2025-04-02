export const getStatusColor = (status: string): string => {
    const statusColors: Record<string, string> = {
        activo: "green",
        pendiente: "orange",
        suspendido: "red"
    };

    return statusColors[status.toLowerCase()] || "gray"; // Retorna 'gray' si el estado no coincide
};