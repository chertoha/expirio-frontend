import type { CreateBatchData } from '@/hooks/api/batches/use-create-batch'
// export const mapEmployeeCreateData = ({
//   birthdate,
//   contractStartDate,
//   contractEndDate,
//   ...restValues
// }: EmployeeDetailsFormValues): CreateEmployeeData => ({
//   ...restValues,
//   birthdate: birthdate?.toISOString() ?? "",
//   contractStartDate: contractStartDate?.toISOString() ?? "",
//   contractEndDate: contractEndDate?.toISOString() ?? "",
// });

import type { CreateBatchFormValues } from '@/schemas/batch.schema'

// export const mapEmployeeFormData = ({
//   employeeProfile: {
//     salutation,
//     birthdate,
//     contractStartDate,
//     contractEndDate,
//     ...restProfile
//   },
//   ...rest
// }: Employee): EmployeeDetailsFormValues => ({
//   ...restProfile,
//   ...rest,

//   birthdate: new Date(birthdate),
//   contractStartDate: new Date(contractStartDate),
//   contractEndDate: new Date(contractEndDate),
//   password: "",
//   salutation: salutation as SalutationType,
// });

export const mapBatchCreateData = ({
  manufactureDate,
  expirationDate,
  ...restValues
}: CreateBatchFormValues): CreateBatchData => ({
  ...restValues,
  manufactureDate: manufactureDate?.toISOString() ?? '',
  expirationDate: expirationDate?.toISOString() ?? '',
})
