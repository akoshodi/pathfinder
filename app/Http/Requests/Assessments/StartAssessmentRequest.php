<?php

namespace App\Http\Requests\Assessments;

use Illuminate\Foundation\Http\FormRequest;

class StartAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Currently no inputs other than slug in route; placeholder for future options
        ];
    }
}
