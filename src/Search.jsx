let Search=(props)=>{
    return(
        <>
        <p className="mt-4">Showing {props.total} movies from the database</p>
        <button type="button" class="btn btn-primary mt-2">New</button>
        <div className="row">
            <div className="col-4">
                <div class="input-group flex-nowrap">
                <input onChange={(e)=>{props.updateSearch(e.currentTarget.value)}} type="text" class="form-control mt-4" placeholder="Search" aria-label="Username" aria-describedby="addon-wrapping" value={props.search}/>
                </div>
            </div>
        </div>
        </>
    )
}
export default Search;