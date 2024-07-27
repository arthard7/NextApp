import {Resend} from 'resend'
import {PayOrderTemplate, PayOrderTemplateProps} from "@/app/shared/components/shared/email-templates/pay-order";


export const sendEmail = async (to: string, subject: string, template: React.ReactNode) => {

    const resend = new Resend(process.env.RESEND_API_KEY)

    const {data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev>',
        to,
        subject,
        react: template,
    })

    if (error) {
        console.error(error)
        throw new Error(error.message)
    } else {

        return data
    }

}