"use server";

import { revalidatePath } from "next/cache";
import { createEmployeeSchema } from "@/schemas/createEmployeeSchema";
import type { Employee } from "@/types/employee";

const IN_MEMORY_EMPLOYEES: Employee[] = [];

export async function createEmployeeAction(data: unknown): Promise<Employee> {
  // Validate data server-side
  const parsed = createEmployeeSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Validation failed: ${parsed.error.issues.map((issue) => issue.message).join(", ")}`
    );
  }

  const newEmployee: Employee = {
    id: typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `emp-${Date.now()}`,
    ...parsed.data,
  };

  // server delay (simulating API call)
  await new Promise((res) => setTimeout(res, 800));
  IN_MEMORY_EMPLOYEES.unshift(newEmployee);

  revalidatePath("/employees");

  return newEmployee;
}

// Get all employees from in-memory storage
export async function getEmployeesAction(): Promise<Employee[]> {
  // Simulate API delay
  await new Promise((res) => setTimeout(res, 300));
  
  return IN_MEMORY_EMPLOYEES;
}
