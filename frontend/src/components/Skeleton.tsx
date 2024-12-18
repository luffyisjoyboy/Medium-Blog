export const Skeleton = ()=>{
    return <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full"></div>
    <div className="h-2 bg-gray-200 rounded-full "></div>
    <div className="h-2 bg-gray-200 rounded-full "></div>
    <div className="h-2 bg-gray-200 rounded-full"></div>
    <div className="h-2 bg-gray-200 rounded-full "></div>
    <div className="h-2 bg-gray-200 rounded-full"></div>
    <span className="sr-only">Loading...</span>
</div>


}