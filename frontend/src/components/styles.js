import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

const drawerWidth = 280; // Slightly wider drawer for a more spacious layout

// Styled TableCell with enhanced styling for better readability
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.dark, // Use primary dark for a modern look
        color: theme.palette.common.white,
        fontWeight: 'bold', // Bold headers for emphasis
        fontSize: 16, // Larger font for better readability
        textTransform: 'uppercase', // Uppercase for a more formal look
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 15,
        padding: '10px 20px', // Add padding for more breathing room
        color: theme.palette.text.primary, // Use primary text color for body cells
    },
}));

// Styled TableRow with subtle hover effects
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.background.default, // Alternate background for contrast
    },
    '&:hover': {
        backgroundColor: theme.palette.action.selected, // Subtle hover effect
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Styled AppBar with a sleek transition and shadow for depth
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: theme.palette.primary.main, // Primary color for AppBar
    boxShadow: theme.shadows[4], // Add shadow for depth
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Styled Drawer with a modern appearance and smooth transitions
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            backgroundColor: theme.palette.background.paper, // Use a paper background for a clean look
            borderRight: `1px solid ${theme.palette.divider}`, // Add a subtle border for separation
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(8), // Adjust width for compact view
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(10),
                },
            }),
        },
    }),
);
