
interface Props { // for hinting
    progress: { count: number, total: number }
}

const rr: React.FC<Props> = ({ progress }) => {
    return <>
        <div>目前进度：</div>
        <div>{progress.count}/{progress.total}</div>
    </>
}

export default rr
