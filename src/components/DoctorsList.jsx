import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorsList = ({doctor}) => {
    const navigate=useNavigate();
  return (
    <>
    <div className="card mr-2 " style={{cursor:"pointer"}} onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization {doctor.specialization}</b>
            </p>
            <p>
                <b>Experience {doctor.experience}</b>
            </p>
            <p>
                <b>FeePerConsultation{doctor.feePerConsultation}</b>
            </p>
            <p>
                <b>Timings {doctor.timing[0]} - {doctor.timing[1]}</b>
            </p>
        </div>
    </div>
    </>
  )
}

export default DoctorsList