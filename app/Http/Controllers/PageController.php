<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function about(): Response
    {
        return Inertia::render('Pages/About');
    }

    public function aboutTeam(): Response
    {
        return Inertia::render('Pages/About/Team');
    }

    public function aboutCareers(): Response
    {
        return Inertia::render('Pages/About/Careers');
    }

    public function aboutPress(): Response
    {
        return Inertia::render('Pages/About/Press');
    }

    public function aboutData(): Response
    {
        return Inertia::render('Pages/About/Data');
    }

    public function aboutPartnerships(): Response
    {
        return Inertia::render('Pages/About/Partnerships');
    }

    public function aboutContact(): Response
    {
        return Inertia::render('Pages/About/Contact');
    }

    public function help(): Response
    {
        return Inertia::render('Pages/Help');
    }

    public function terms(): Response
    {
        return Inertia::render('Pages/Terms');
    }

    public function privacy(): Response
    {
        return Inertia::render('Pages/Privacy');
    }

    public function accessibility(): Response
    {
        return Inertia::render('Pages/Accessibility');
    }

    public function sitemap(): Response
    {
        return Inertia::render('Pages/Sitemap');
    }

    public function recommendations(): Response
    {
        return Inertia::render('Pages/Recommendations');
    }

    public function courseEligibility(): Response
    {
        return Inertia::render('Pages/CourseEligibility');
    }

    public function claimSchool(): Response
    {
        return Inertia::render('Pages/ClaimSchool');
    }
}
