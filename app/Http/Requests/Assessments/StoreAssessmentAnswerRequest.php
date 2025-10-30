<?php

namespace App\Http\Requests\Assessments;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssessmentAnswerRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Authorization is handled in controller by comparing user/session to the attempt
        return true;
    }

    public function rules(): array
    {
        return [
            'question_id' => ['required', 'integer', 'exists:assessment_questions,id'],
            'response_value' => ['required'],
            'time_spent' => ['nullable', 'integer', 'min:0'],
        ];
    }

    public function messages(): array
    {
        return [
            'question_id.required' => 'A question is required.',
            'question_id.exists' => 'The selected question does not exist.',
            'response_value.required' => 'A response value is required.',
        ];
    }
}
