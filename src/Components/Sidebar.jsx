import { Drawer, Box, useTheme, Toolbar } from "@mui/material";

const drawerWidth = 260;

export default function Sidebar({ window, mobileOpen, handleDrawerToggle, drawerContent }) {
    const theme = useTheme();
    const container = window !== undefined ? () => window().document.body : undefined;

    const drawerStyles = {
        "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            background: "linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)",
            color: "white",
            borderRight: "1px solid rgba(255,255,255,0.1)"
        },
    };

    return (
        <Box
            component="nav"
            sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            aria-label="mailbox folders"
        >
            {/* MOBILE DRAWER (Temporary) */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    ...drawerStyles
                }}
            >
                {drawerContent}
            </Drawer>

            {/* DESKTOP DRAWER (Permanent) */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    ...drawerStyles
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
