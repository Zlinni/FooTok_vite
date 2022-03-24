import axios from 'axios'

export default async function () {
    var arr = [];
    await axios.get("/api/swiper").then((res) => {
        // console.log(res);
        // if(res.status ===200){
        //     arr = res.data;
        // }
        if (res.data.code === 200) {
            arr = res.data.data.records;
        }
    }).catch((err) => {
        console.log(err);
    })
    return arr
}