<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Career Fit Analysis Report</title>
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 11px;
            color: #333;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 3px solid #4F46E5;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #4F46E5;
            font-size: 24px;
            margin: 0 0 10px 0;
        }
        .header p {
            color: #666;
            margin: 5px 0;
        }
        .section {
            margin: 25px 0;
            page-break-inside: avoid;
        }
        .section-title {
            color: #4F46E5;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 2px solid #E5E7EB;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .profile-summary {
            background: #F3F4F6;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .profile-item {
            margin: 10px 0;
        }
        .profile-item strong {
            color: #1F2937;
        }
        .career-match {
            background: white;
            border: 1px solid #E5E7EB;
            padding: 15px;
            margin: 15px 0;
            border-left: 4px solid #10B981;
        }
        .career-match h3 {
            margin: 0 0 10px 0;
            color: #1F2937;
            font-size: 14px;
        }
        .score-bar {
            background: #E5E7EB;
            height: 20px;
            border-radius: 10px;
            overflow: hidden;
            margin: 8px 0;
        }
        .score-fill {
            background: #10B981;
            height: 100%;
            line-height: 20px;
            color: white;
            text-align: right;
            padding-right: 10px;
            font-size: 9px;
        }
        .skill-gap {
            background: #FEF3C7;
            border-left: 3px solid #F59E0B;
            padding: 10px;
            margin: 10px 0;
        }
        .learning-phase {
            background: #EFF6FF;
            border-left: 3px solid #3B82F6;
            padding: 12px;
            margin: 12px 0;
        }
        .learning-phase h4 {
            margin: 0 0 8px 0;
            color: #1E40AF;
        }
        ul {
            margin: 8px 0;
            padding-left: 20px;
        }
        li {
            margin: 5px 0;
        }
        .footer {
            position: fixed;
            bottom: 0;
            width: 100%;
            text-align: center;
            font-size: 9px;
            color: #9CA3AF;
            padding: 10px 0;
            border-top: 1px solid #E5E7EB;
        }
        .page-break {
            page-break-after: always;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            padding: 8px;
            text-align: left;
            border-bottom: 1px solid #E5E7EB;
        }
        th {
            background: #F3F4F6;
            font-weight: bold;
            color: #1F2937;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Career Fit Analysis Report</h1>
        <p><strong>{{ $user->name }}</strong></p>
        <p>Generated: {{ $generatedAt }}</p>
    </div>

    <!-- Executive Summary -->
    <div class="section">
        <div class="section-title">Executive Summary</div>
        <div class="profile-summary">
            <div class="profile-item">
                <strong>Overall Career Readiness:</strong> {{ $analysis['overall_readiness']['level'] }} ({{ $analysis['overall_readiness']['score'] }}%)
            </div>
            <div class="profile-item">
                <strong>Top Career Match:</strong> {{ $analysis['overall_readiness']['top_career'] ?? 'N/A' }}
            </div>
            <div class="profile-item">
                <strong>Holland Code:</strong> {{ $analysis['profile']['interest_profile']['holland_code'] }}
            </div>
        </div>
    </div>

    <!-- Interest Profile -->
    <div class="section">
        <div class="section-title">Interest Profile (RIASEC)</div>
        <p><strong>Primary Interests:</strong> {{ implode(', ', $analysis['profile']['interest_profile']['primary_codes']) }}</p>
        
        <table>
            <tr>
                <th>Interest Area</th>
                <th>Score</th>
            </tr>
            @foreach($analysis['profile']['interest_profile']['scores'] as $code => $score)
            <tr>
                <td>{{ $code }}</td>
                <td>
                    <div class="score-bar">
                        <div class="score-fill" style="width: {{ $score }}%;">{{ $score }}%</div>
                    </div>
                </td>
            </tr>
            @endforeach
        </table>
    </div>

    <!-- Skills Profile -->
    <div class="section page-break">
        <div class="section-title">Skills Profile</div>
        
        <p><strong>Key Strengths:</strong></p>
        <ul>
            @foreach($analysis['profile']['skills_profile']['strengths'] as $skill => $score)
            <li>{{ $skill }}: {{ round($score) }}%</li>
            @endforeach
        </ul>

        @if(!empty($analysis['profile']['skills_profile']['growth_areas']))
        <p><strong>Growth Areas:</strong></p>
        <ul>
            @foreach($analysis['profile']['skills_profile']['growth_areas'] as $skill => $score)
            <li>{{ $skill }}: {{ round($score) }}%</li>
            @endforeach
        </ul>
        @endif
    </div>

    <!-- Personality Profile -->
    <div class="section">
        <div class="section-title">Personality Profile (Big Five)</div>
        
        @if(!empty($analysis['profile']['personality_profile']['insights']))
        @foreach($analysis['profile']['personality_profile']['insights'] as $insight)
        <p>• {{ $insight }}</p>
        @endforeach
        @endif

        <table>
            <tr>
                <th>Trait</th>
                <th>Score</th>
            </tr>
            @foreach($analysis['profile']['personality_profile']['traits'] as $trait => $score)
            <tr>
                <td>{{ $trait }}</td>
                <td>{{ number_format($score, 1) }}/5.0</td>
            </tr>
            @endforeach
        </table>
    </div>

    <!-- Top Career Matches -->
    <div class="section page-break">
        <div class="section-title">Top Career Matches</div>
        
        @foreach(array_slice($analysis['career_matches'], 0, 10) as $career)
        <div class="career-match">
            <h3>{{ $loop->iteration }}. {{ $career['title'] }}</h3>
            <p><small>{{ $career['onetsoc_code'] }}</small></p>
            
            <p><strong>Composite Score:</strong> {{ $career['composite_score'] }}%</p>
            <p>{{ $career['fit_explanation'] }}</p>
            
            <table style="margin-top: 10px;">
                <tr>
                    <td><strong>Interest Fit:</strong></td>
                    <td>{{ $career['interest_fit'] }}%</td>
                    <td><strong>Skills Fit:</strong></td>
                    <td>{{ $career['skills_fit'] }}%</td>
                    <td><strong>Personality Fit:</strong></td>
                    <td>{{ $career['personality_fit'] }}%</td>
                </tr>
            </table>

            @if(!empty($career['description']))
            <p style="margin-top: 10px;"><em>{{ substr($career['description'], 0, 200) }}...</em></p>
            @endif
        </div>
        @endforeach
    </div>

    <!-- Skill Gaps Analysis -->
    @if(!empty($analysis['skill_gaps']))
    <div class="section page-break">
        <div class="section-title">Skill Gap Analysis</div>
        
        @foreach($analysis['skill_gaps'] as $careerTitle => $gaps)
        <div style="margin: 20px 0;">
            <h3 style="color: #1F2937; font-size: 13px;">{{ $careerTitle }}</h3>
            
            @foreach(array_slice($gaps, 0, 5) as $gap)
            <div class="skill-gap">
                <strong>{{ $gap['skill'] }}</strong> (Priority: {{ $gap['priority'] }})<br>
                Current: {{ round($gap['current_level']) }}% | Required: {{ round($gap['required_level']) }}% | Gap: {{ round($gap['gap']) }}%
            </div>
            @endforeach
        </div>
        @endforeach
    </div>
    @endif

    <!-- Learning Paths -->
    @if(!empty($analysis['learning_paths']))
    <div class="section page-break">
        <div class="section-title">Personalized Learning Paths</div>
        
        @foreach(array_slice($analysis['learning_paths'], 0, 3) as $path)
        <div style="margin: 20px 0;">
            <h3 style="color: #1F2937; font-size: 13px;">Path to {{ $path['career'] }}</h3>
            <p><strong>Estimated Timeframe:</strong> {{ $path['timeframe'] }}</p>
            
            @foreach($path['phases'] as $phase)
            <div class="learning-phase">
                <h4>Phase {{ $phase['phase'] }}: {{ $phase['title'] }} ({{ $phase['duration'] }})</h4>
                
                @if(!empty($phase['skills']))
                <p><strong>Focus Skills:</strong></p>
                <ul>
                    @foreach($phase['skills'] as $skill)
                    <li>{{ $skill['skill'] }} → Target Level: {{ $skill['target_level'] }}%</li>
                    @endforeach
                </ul>
                @endif

                @if(!empty($phase['focus']))
                <p><strong>Key Activities:</strong></p>
                <ul>
                    @foreach($phase['focus'] as $activity)
                    <li>{{ $activity }}</li>
                    @endforeach
                </ul>
                @endif
            </div>
            @endforeach
        </div>
        @endforeach
    </div>
    @endif

    <div class="footer">
        <p>This report is confidential and intended for {{ $user->name }} only.</p>
        <p>Generated by Pathfinder Career Assessment System | {{ $generatedAt }}</p>
    </div>
</body>
</html>
