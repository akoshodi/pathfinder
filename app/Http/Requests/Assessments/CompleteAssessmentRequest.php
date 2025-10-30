<?php

namespace App\Http\Requests\Assessments;

use Illuminate\Foundation\Http\FormRequest;

class CompleteAssessmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // No body required; route model binding provides attempt
        ];
    }
}
