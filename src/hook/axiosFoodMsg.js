import axios from 'axios'

export default async function () {
    var arr = [];
    await axios.post("/api/swiper",{
        id:parseInt(sessionStorage.getItem('sid'))
    }).then((res) => {
        // node
        if(res.status ===200){
            arr = res.data;
        }
        //spring
        // if (res.data.code === 200) {
        //     arr = res.data.data.records;
        // }
        console.log(arr);
    }).catch((err) => {
        console.log(err);
    })
    return arr
}