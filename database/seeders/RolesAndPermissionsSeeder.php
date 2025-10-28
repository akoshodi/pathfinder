<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        $permissions = [
            // University permissions
            'view universities',
            'create universities',
            'edit universities',
            'delete universities',
            'claim university',

            // Course permissions
            'view courses',
            'create courses',
            'edit courses',
            'delete courses',

            // Company permissions
            'view companies',
            'create companies',
            'edit companies',
            'delete companies',
            'claim company',
            'manage company jobs',

            // Career/Job permissions
            'view careers',
            'create careers',
            'edit careers',
            'delete careers',
            'apply to careers',

            // Blog permissions
            'view blog posts',
            'create blog posts',
            'edit blog posts',
            'delete blog posts',
            'publish blog posts',

            // Resource permissions
            'view resources',
            'create resources',
            'edit resources',
            'delete resources',

            // Alumni permissions
            'view alumni',
            'access alumni network',
            'manage mentorship',

            // Assessment permissions
            'take assessments',
            'view assessment results',

            // User management
            'manage users',
            'assign roles',

            // General
            'access dashboard',
            'save items',
            'compare items',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions

        // Super Admin - has all permissions
        $superAdmin = Role::create(['name' => 'super-admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Admin - can manage most things
        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo([
            'view universities',
            'edit universities',
            'view courses',
            'edit courses',
            'view companies',
            'edit companies',
            'view careers',
            'edit careers',
            'view blog posts',
            'create blog posts',
            'edit blog posts',
            'delete blog posts',
            'publish blog posts',
            'view resources',
            'create resources',
            'edit resources',
            'delete resources',
            'manage users',
            'access dashboard',
        ]);

        // Student - general user
        $student = Role::create(['name' => 'student']);
        $student->givePermissionTo([
            'view universities',
            'view courses',
            'view companies',
            'view careers',
            'apply to careers',
            'view blog posts',
            'view resources',
            'take assessments',
            'view assessment results',
            'access dashboard',
            'save items',
            'compare items',
        ]);

        // Alumni - graduated students with mentor capabilities
        $alumni = Role::create(['name' => 'alumni']);
        $alumni->givePermissionTo([
            'view universities',
            'view courses',
            'view companies',
            'view careers',
            'apply to careers',
            'view blog posts',
            'create blog posts',
            'view resources',
            'create resources',
            'view alumni',
            'access alumni network',
            'manage mentorship',
            'access dashboard',
            'save items',
            'compare items',
        ]);

        // University Representative
        $universityRep = Role::create(['name' => 'university-representative']);
        $universityRep->givePermissionTo([
            'view universities',
            'edit universities',
            'claim university',
            'view courses',
            'create courses',
            'edit courses',
            'view blog posts',
            'create blog posts',
            'access dashboard',
        ]);

        // Company Representative
        $companyRep = Role::create(['name' => 'company-representative']);
        $companyRep->givePermissionTo([
            'view companies',
            'edit companies',
            'claim company',
            'manage company jobs',
            'view careers',
            'create careers',
            'edit careers',
            'delete careers',
            'access dashboard',
        ]);

        // Content Creator
        $contentCreator = Role::create(['name' => 'content-creator']);
        $contentCreator->givePermissionTo([
            'view blog posts',
            'create blog posts',
            'edit blog posts',
            'view resources',
            'create resources',
            'edit resources',
            'access dashboard',
        ]);
    }
}
