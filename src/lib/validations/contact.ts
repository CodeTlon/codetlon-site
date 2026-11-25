import { z } from 'zod'
import { SERVICE_INTEREST_OPTIONS } from '@/lib/services-data'

export const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es muy corto').max(100, 'El nombre es muy largo'),
  email: z.string().email('Email inválido').max(200, 'El email es muy largo'),
  company: z.string().max(150, 'El nombre de empresa es muy largo').optional(),
  serviceInterest: z.enum(SERVICE_INTEREST_OPTIONS, { message: 'Servicio inválido' }).optional(),
  message: z.string().min(10, 'El mensaje es muy corto').max(5000, 'El mensaje es muy largo'),
})

export type ContactFormData = z.infer<typeof contactSchema>
