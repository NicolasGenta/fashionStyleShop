import CircularProgress from "@mui/material/CircularProgress"

export const Loader = () => {
    return (
        <section className="w-full flex" style={{zIndex: 20, opacity: 0.4, alignContent: 'center', position: 'absolute', top: 0, width: '100%'}}>
            <CircularProgress />
        </section>
    )
}