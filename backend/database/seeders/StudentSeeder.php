<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Rohit Sharma',
                'email' => 'rohit@example.com',
                'phone' => '9876543210',
                'dob' => '2005-04-10',
                'guardian_name' => 'Sunil Sharma',
                
            ],
            [
                'name' => 'Anjali Mehta',
                'email' => 'anjali@example.com',
                'phone' => '9988776655',
                'dob' => '2004-11-22',
                'guardian_name' => 'Rita Mehta',
               
            ],
            [
                'name' => 'Karan Patel',
                'email' => 'karan@example.com',
                'phone' => '9123456780',
                'dob' => '2006-06-15',
                'guardian_name' => 'Raj Patel',
               
            ],
            [
                'name' => 'Sneha Roy',
                'email' => 'sneha@example.com',
                'phone' => '9090909090',
                'dob' => '2005-01-28',
                'guardian_name' => 'Amit Roy',
               
            ],
        ];

        Student::insert($students);
    }
}
