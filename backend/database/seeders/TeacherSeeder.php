<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Teacher;

class TeacherSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $teachers = [
            [
                'name' => 'Rahul Verma',
                'email' => 'rahul.verma@example.com',
                'phone' => '9876543210',
                'qualification' => 'M.Sc Mathematics',
                'department' => 'Mathematics'
            ],
            [
                'name' => 'Priya Desai',
                'email' => 'priya.desai@example.com',
                'phone' => '9988776655',
                'qualification' => 'M.A English Literature',
                'department' => 'English'
            ],
            [
                'name' => 'Vikas Sharma',
                'email' => 'vikas.sharma@example.com',
                'phone' => '9123456789',
                'qualification' => 'B.Tech Computer Science',
                'department' => 'Computer Science'
            ],
            [
                'name' => 'Sneha Kapoor',
                'email' => 'sneha.kapoor@example.com',
                'phone' => '9090909090',
                'qualification' => 'M.Sc Physics',
                'department' => 'Physics'
            ],
        ];

        Teacher::insert($teachers);
    }
}
