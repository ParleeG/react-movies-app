
let Filter =(props)=>{
        return (
                <ul class="list-group m-4">
                    <li onClick={()=>{
                        props.handlefilter("All Genre");
                    }} class={`list-group-item ${(props.selectedFilter=="All Genre")?"active":""}`}>All Genre</li>
                    {
                        props.genreData.map((el)=>{
                            return <li onClick={()=>{
                                props.handlefilter(el.name);
                            }} 
                            key={el._id} class={`list-group-item ${(props.selectedFilter==el.name)?"active":""}`}>{el.name}</li>
                        })
                    }
                </ul>
        );
}
export default Filter;