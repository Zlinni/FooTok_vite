import axios from 'axios'

export default async function () {
    var arr = [];
    let idObj ={
        id:parseInt(sessionStorage.getItem('sid'))
    }
    await axios.post("/api/swiper",idObj).then((res) => {
        // if(res.status ===200){
        //     arr = res.data;
        // }
        if (res.data.code === 200) {
            arr = res.data.data.records;
        }
        console.log(arr);
    }).catch((err) => {
        console.log(err);
    })
    return arr
}