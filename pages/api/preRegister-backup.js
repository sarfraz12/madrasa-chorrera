import {createPreRegisterUser} from "@/lib/sanity/client"


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const {
    firstName,
    lastName,
    identification,
    gender,
    schoolLevel,
    parentName,
    parentLastName,
    parentIdentification,
    parentEmail,
    parentCellphone,
  } = req.body;

  try {
    const doc = {
      _type: 'preRegisterForm',
      firstName,
      lastName,
      identification,
      gender,
      schoolLevel,
      parentName,
      parentLastName,
      parentIdentification,
      parentEmail,
      parentCellphone,
    };

    await createPreRegisterUser(doc);

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Failed to submit form' });
  }
}