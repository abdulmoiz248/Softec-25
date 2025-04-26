'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// import Navbar from '@/components/layouts/navbar'
import { Button } from '@/components/ui/button'

interface Doctor {
  id: number
  email: string
  role: string
  is_verified: boolean
  specialization: string
  license_no: string
  is_approved: boolean
}

const API_URL = "http://localhost:8000"

export default function AdminDashboard() {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!token) router.replace('/admin/login')
  }, [token, router])

  // 2. Load doctors
  useEffect(() => {
    if (!token) return
    fetch(`${API_URL}/auth/doctors`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => r.json())
      .then(setDoctors)
      .catch(console.error)
  }, [token])

  // 3. Toggle approve/unapprove
  const toggleApproval = async (docId: number, approve: boolean) => {
    if (!token) return
    const path = approve ? 'approve' : 'unapprove'
    const res = await fetch(`${API_URL}/auth/doctors/${docId}/${path}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.status === 204) {
      setDoctors((docs) =>
        docs.map((d) =>
          d.id === docId ? { ...d, is_approved: approve } : d
        )
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* <Navbar /> */}

      <div className="p-6">
        <h2 className="text-2xl mb-4">All Doctors</h2>
        <ul className="space-y-2">
          {doctors.map((doc) => (
            <li
              key={doc.id}
              className="flex justify-between items-center bg-white/10 p-4 rounded"
            >
              <div>
                <p><strong>Email:</strong> {doc.email}</p>
                <p><strong>Specialization:</strong> {doc.specialization}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  {doc.is_approved ? 'Approved' : 'Not Approved'}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => toggleApproval(doc.id, !doc.is_approved)}
                className={
                  doc.is_approved
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : 'bg-green-600 hover:bg-green-700'
                }
              >
                {doc.is_approved ? 'Unapprove' : 'Approve'}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
