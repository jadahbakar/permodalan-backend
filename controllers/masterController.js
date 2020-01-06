var db = require('../db/db')
// const yearNow = new Date().getFullYear()

const getKabupatenKota = async (request, response, next) => {
  const getKabKota = await db.any('SELECT kabupaten_kota_id, kabupaten_kota_nama FROM mst.kabupaten_kota ORDER BY kabupaten_kota_id')
  response.json(getKabKota)
}

const getKabupatenKotaDetail = async (request, response, next) => {
  const id = request.params.id
  const getKabKotaDetail = await db.any(`SELECT kabupaten_kota_id, kabupaten_kota_nama, kabupaten_kota_alamat, 
          kabupaten_kota_bupati, kabupaten_kota_telp, kabupaten_kota_pic_nama, kabupaten_kota_pic_telp 
          FROM mst.kabupaten_kota WHERE kabupaten_kota_id = $(id)`, { id })
  response.json(getKabKotaDetail)
}

const putKabupatenKotaEdit = async (request, response, next) => {
  const id = request.params.id
  const { alamat, bupati, telepon, picNama, picTelp } = request.body
  await db.none(`UPDATE mst.kabupaten_kota 
          SET kabupaten_kota_alamat = $(alamat), kabupaten_kota_bupati = $(bupati), 
          kabupaten_kota_telp = $(telepon), kabupaten_kota_pic_nama = $(picNama), 
          kabupaten_kota_pic_telp = $(picTelp) 
          WHERE kabupaten_kota_id = $(id)`,
  { alamat, bupati, telepon, picNama, picTelp, id })
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getWilayah = async (request, response, next) => {
  const getgetWilayah = await db.any('SELECT wilayah_bpd_id, wilayah_bpd_nama FROM mst.wilayah_bpd ORDER BY wilayah_bpd_id')
  response.json(getgetWilayah)
}

const getWilayahDetail = async (request, response, next) => {
  const id = request.params.id
  const getgetWilayahDetail = await db.any('SELECT wilayah_bpd_id, wilayah_bpd_nama FROM mst.wilayah_bpd  WHERE wilayah_bpd_id = $(id)', { id })
  response.json(getgetWilayahDetail)
}

const getWilayahCabang = async (request, response, next) => {
  const wilayah = request.params.wilayah
  const getWilCabang = await db.any(`SELECT cabang_bpd_id, cabang_bpd_nama, cabang_bpd_pic, cabang_bpd_pic_telp 
  FROM mst.cabang_bpd WHERE cabang_bpd_wilayah = $(wilayah) ORDER BY cabang_bpd_kode`, { wilayah })
  response.json(getWilCabang)
}

const getCabang = async (request, response, next) => {
  const getKabKota = await db.any('SELECT cabang_bpd_id, cabang_bpd_nama, cabang_bpd_pic, cabang_bpd_pic_telp FROM mst.cabang_bpd ORDER BY cabang_bpd_id')
  response.json(getKabKota)
}

const getCabangDetail = async (request, response, next) => {
  const id = request.params.id
  const getKabKotaDetail = await db.any(`SELECT cabang_bpd_id, cabang_bpd_nama, cabang_bpd_pic, cabang_bpd_pic_telp 
          FROM mst.cabang_bpd WHERE cabang_bpd_id = $(id)`, { id })
  response.json(getKabKotaDetail)
}

const putCabangEdit = async (request, response, next) => {
  const id = request.params.id
  const { pic, telepon } = request.body
  await db.none(`UPDATE mst.cabang_bpd 
          SET cabang_bpd_pic = $(pic), cabang_bpd_pic_telp = $(telepon)  
          FROM mst.cabang_bpd WHERE cabang_bpd_id = $(id)`,
  { pic, telepon, id })
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
}

const getRUPS = async (request, response, next) => {
  const getRUPS = await db.any('SELECT rups_date, rups_akta, rups_notaris, rups_ringkasan, rups_attachment FROM mst.rups ORDER BY rups_date DESC')
  response.json(getRUPS)
}

const getRUPSDetail = async (request, response, next) => {
  const tanggal = request.params.tanggal
  const getRUPSDetail = await db.any(`SELECT rups_date, rups_akta, rups_notaris, rups_ringkasan, rups_attachment 
        FROM mst.rups 
        WHERE rups_date = $(tanggal)::date`, { tanggal })
  response.json(getRUPSDetail)
}

const postRUPS = async (request, response, next) => {
  const { tanggal, akta, notaris, ringkasan, attachment } = request.body
  await db.none(`INSERT INTO mst.rups (rups_date, rups_akta, rups_notaris, rups_ringkasan, rups_attachment)
          VALUES ($(tanggal), $(akta), $(notaris), $(ringkasan), $(attachment))`,
  { tanggal, akta, notaris, ringkasan, attachment })
  try {
    return response.status(200).send('created')
  } catch (error) {
    return response.status(400).send(error)
  }
}

const putRUPS = async (request, response, next) => {
  const tanggal = request.params.tanggal
  const { akta, notaris, ringkasan, attachment } = request.body
  await db.none(`UPDATE mst.rups 
          SET rups_akta = $(akta), rups_notaris = $(notaris), rups_ringkasan = $(ringkasan), rups_attachment = $(attachment)
          WHERE rups_date = $(tanggal)`,
  { akta, notaris, ringkasan, attachment, tanggal })
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
}

const delRUPS = async (request, response, next) => {
  const tanggal = request.params.tanggal
  // const delRUPS = await db.any('DELETE FROM mst.rups WHERE rups_date = $(tanggal)::date', { tanggal })
  // response.json(delRUPS)
  const result = await db.result('DELETE FROM mst.rups WHERE rups_date = $(tanggal)::date', { tanggal })
  response.json(result.rowCount)
}

const getSetor = async (request, response, next) => {
  const getSetor = await db.any(`SELECT setoran_modal_tanggal, setoran_modal_kabupaten_kota, setoran_modal_nominal, setoran_modal_sumber, setoran_modal_attachment 
        FROM mst.setoran_modal ORDER BY setoran_modal_tanggal DESC`)
  response.json(getSetor)
}

const getSetorDetail = async (request, response, next) => {
  const tanggal = request.params.tanggal
  const getSetorDetail = await db.any(`SELECT setoran_modal_id, setoran_modal_tanggal, setoran_modal_kabupaten_kota, setoran_modal_nominal, setoran_modal_sumber, setoran_modal_attachment
        FROM mst.setoran_modal 
        WHERE setoran_modal_tanggal = $(tanggal)::date`, { tanggal })
  response.json(getSetorDetail)
}

const postSetor = async (request, response, next) => {
  const { tanggal, kabKota, nominal, sumber, attachment } = request.body
  const postSetor = await db.any(`INSERT INTO mst.setoran_modal (setoran_modal_tanggal, setoran_modal_kabupaten_kota, setoran_modal_nominal, setoran_modal_sumber, setoran_modal_attachment)
          VALUES ($(tanggal), $(kabKota), $(nominal), $(sumber), $(attachment)) RETURNING setoran_modal_id`,
  { tanggal, kabKota, nominal, sumber, attachment })
  try {
    // return response.status(200).send('created')
    return response.status(200).json(postSetor[0])
  } catch (error) {
    return response.status(400).send(error)
  }
}

const putSetor = async (request, response, next) => {
  const tanggal = request.params.tanggal
  const { kabKota, nominal, sumber, attachment } = request.body
  await db.none(`UPDATE mst.setoran_modal 
          SET setoran_modal_kabupaten_kota = $(kabKota), setoran_modal_nominal = $(nominal), setoran_modal_sumber = $(sumber), setoran_modal_attachment = $(attachment)
          WHERE setoran_modal_tanggal = $(tanggal)`,
  { kabKota, nominal, sumber, attachment, tanggal })
  try {
    return response.status(200).send('updated')
  } catch (error) {
    return response.status(400).send(error)
  }
}

const delSetor = async (request, response, next) => {
  const tanggal = request.params.tanggal
  const delRUPS = await db.any('DELETE FROM mst.setoran_modal WHERE setoran_modal_tanggal = $(tanggal)::date', { tanggal })
  response.json(delRUPS.rowCount)
}

module.exports = {
  getKabupatenKota,
  getKabupatenKotaDetail,
  putKabupatenKotaEdit,
  getWilayah,
  getWilayahDetail,
  getWilayahCabang,

  getCabang,
  getCabangDetail,
  putCabangEdit,

  getRUPS,
  getRUPSDetail,
  postRUPS,
  putRUPS,
  delRUPS,

  getSetor,
  getSetorDetail,
  postSetor,
  putSetor,
  delSetor

}
